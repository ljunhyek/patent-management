import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const patent = await prisma.patent.findFirst({
      where: {
        id: params.id,
        userId: session.user.id
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    })

    if (!patent) {
      return NextResponse.json({ error: "Patent not found" }, { status: 404 })
    }

    return NextResponse.json(patent)
  } catch (error) {
    console.error("Error fetching patent:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const {
      applicationNo,
      registrationNo,
      title,
      applicant,
      inventor,
      applicationDate,
      publicationDate,
      registrationDate,
      pctDeadline,
      pctNumber,
      status
    } = body

    const existingPatent = await prisma.patent.findFirst({
      where: {
        id: params.id,
        userId: session.user.id
      }
    })

    if (!existingPatent) {
      return NextResponse.json({ error: "Patent not found" }, { status: 404 })
    }

    if (applicationNo !== existingPatent.applicationNo) {
      const conflictingPatent = await prisma.patent.findUnique({
        where: { applicationNo }
      })

      if (conflictingPatent) {
        return NextResponse.json(
          { error: "Patent with this application number already exists" },
          { status: 409 }
        )
      }
    }

    const patent = await prisma.patent.update({
      where: { id: params.id },
      data: {
        applicationNo,
        registrationNo: registrationNo || null,
        title,
        applicant,
        inventor,
        applicationDate: new Date(applicationDate),
        publicationDate: publicationDate ? new Date(publicationDate) : null,
        registrationDate: registrationDate ? new Date(registrationDate) : null,
        pctDeadline: pctDeadline ? new Date(pctDeadline) : null,
        pctNumber: pctNumber || null,
        status
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    })

    return NextResponse.json(patent)
  } catch (error) {
    console.error("Error updating patent:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const existingPatent = await prisma.patent.findFirst({
      where: {
        id: params.id,
        userId: session.user.id
      }
    })

    if (!existingPatent) {
      return NextResponse.json({ error: "Patent not found" }, { status: 404 })
    }

    await prisma.patent.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ message: "Patent deleted successfully" })
  } catch (error) {
    console.error("Error deleting patent:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}