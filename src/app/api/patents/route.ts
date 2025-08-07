import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const searchParams = request.nextUrl.searchParams
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "10")
    const search = searchParams.get("search") || ""
    const status = searchParams.get("status") || ""
    const sortBy = searchParams.get("sortBy") || "createdAt"
    const sortOrder = searchParams.get("sortOrder") || "desc"

    const skip = (page - 1) * limit

    const where = {
      userId: session.user.id,
      ...(search && {
        OR: [
          { title: { contains: search, mode: "insensitive" as const } },
          { applicationNo: { contains: search, mode: "insensitive" as const } },
          { registrationNo: { contains: search, mode: "insensitive" as const } },
          { pctNumber: { contains: search, mode: "insensitive" as const } },
          { applicant: { contains: search, mode: "insensitive" as const } },
          { inventor: { contains: search, mode: "insensitive" as const } }
        ]
      }),
      ...(status && { status })
    }

    const [patents, total] = await Promise.all([
      prisma.patent.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true
            }
          }
        }
      }),
      prisma.patent.count({ where })
    ])

    return NextResponse.json({
      patents,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error("Error fetching patents:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
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

    if (!applicationNo || !title || !applicant || !inventor || !applicationDate || !status) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    const existingPatent = await prisma.patent.findUnique({
      where: { applicationNo }
    })

    if (existingPatent) {
      return NextResponse.json(
        { error: "Patent with this application number already exists" },
        { status: 409 }
      )
    }

    const patent = await prisma.patent.create({
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
        status,
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

    return NextResponse.json(patent, { status: 201 })
  } catch (error) {
    console.error("Error creating patent:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}