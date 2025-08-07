import { NextRequest, NextResponse } from "next/server"
import bcryptjs from "bcryptjs"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    const { 
      name, email, patentNumber, password, manager, contact, inventor,
      userType, termsAgreed, privacyAgreed, emailAgreed 
    } = await request.json()

    if (!name || !email || !patentNumber || !password || !userType || 
        termsAgreed === undefined || privacyAgreed === undefined || emailAgreed === undefined) {
      return NextResponse.json(
        { error: "Name, email, patent number, password, user type, and agreement fields are required" },
        { status: 400 }
      )
    }

    // 사용자 구분 값 검증
    if (!['1', '2', '3'].includes(userType)) {
      return NextResponse.json(
        { error: "User type must be '1' (법인), '2' (개인), or '3' (법인+발명자)" },
        { status: 400 }
      )
    }

    // 필수 동의 검증
    if (!termsAgreed || !privacyAgreed) {
      return NextResponse.json(
        { error: "Terms of service and privacy policy agreement are required" },
        { status: 400 }
      )
    }

    const existingUserByEmail = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUserByEmail) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 400 }
      )
    }

    const existingUserByPatentNumber = await prisma.user.findUnique({
      where: { patentNumber }
    })

    if (existingUserByPatentNumber) {
      return NextResponse.json(
        { error: "User with this patent number already exists" },
        { status: 400 }
      )
    }

    const hashedPassword = await bcryptjs.hash(password, 12)

    const user = await prisma.user.create({
      data: {
        name,
        email,
        patentNumber,
        password: hashedPassword,
        manager,
        contact,
        inventor,
        userType,
        termsAgreed,
        privacyAgreed,
        emailAgreed
      }
    })

    return NextResponse.json(
      { 
        message: "User created successfully",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          patentNumber: user.patentNumber,
          manager: user.manager,
          contact: user.contact,
          inventor: user.inventor,
          userType: user.userType,
          termsAgreed: user.termsAgreed,
          privacyAgreed: user.privacyAgreed,
          emailAgreed: user.emailAgreed
        }
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}