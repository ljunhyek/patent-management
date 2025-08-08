import { NextRequest, NextResponse } from "next/server"
import bcryptjs from "bcryptjs"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  console.log("🚀 Registration API called")
  console.log("🔧 Environment check:", {
    nodeEnv: process.env.NODE_ENV,
    hasDatabaseUrl: !!process.env.DATABASE_URL,
    databaseUrlPrefix: process.env.DATABASE_URL?.substring(0, 20) + "...",
    hasNextAuthUrl: !!process.env.NEXTAUTH_URL,
    hasNextAuthSecret: !!process.env.NEXTAUTH_SECRET
  })
  
  try {
    // Test database connection first
    console.log("🔗 Testing database connection...")
    await prisma.$connect()
    console.log("✅ Database connected successfully")
    
    console.log("📋 Parsing request body...")
    const { 
      name, email, patentNumber, password, manager, contact, inventor,
      userType, termsAgreed, privacyAgreed, emailAgreed 
    } = await request.json()

    console.log("📝 Request data:", { 
      name, email, patentNumber: patentNumber?.substring(0, 6) + "...", 
      userType, termsAgreed, privacyAgreed, emailAgreed,
      hasManager: !!manager, hasContact: !!contact, hasInventor: !!inventor
    })

    if (!name || !email || !patentNumber || !password || !userType || 
        termsAgreed === undefined || privacyAgreed === undefined || emailAgreed === undefined) {
      console.log("❌ Validation failed: Missing required fields")
      return NextResponse.json(
        { error: "Name, email, patent number, password, user type, and agreement fields are required" },
        { status: 400 }
      )
    }

    // 사용자 구분 값 검증
    if (!['1', '2', '3'].includes(userType)) {
      console.log("❌ Validation failed: Invalid user type", userType)
      return NextResponse.json(
        { error: "User type must be '1' (법인), '2' (개인), or '3' (법인+발명자)" },
        { status: 400 }
      )
    }

    // 필수 동의 검증
    if (!termsAgreed || !privacyAgreed) {
      console.log("❌ Validation failed: Required agreements not checked")
      return NextResponse.json(
        { error: "Terms of service and privacy policy agreement are required" },
        { status: 400 }
      )
    }

    console.log("🔍 Checking for existing user by email...")
    const existingUserByEmail = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUserByEmail) {
      console.log("❌ User already exists with email")
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 400 }
      )
    }

    console.log("🔍 Checking for existing user by patent number...")
    const existingUserByPatentNumber = await prisma.user.findUnique({
      where: { patentNumber }
    })

    if (existingUserByPatentNumber) {
      console.log("❌ User already exists with patent number")
      return NextResponse.json(
        { error: "User with this patent number already exists" },
        { status: 400 }
      )
    }

    console.log("🔐 Hashing password...")
    const hashedPassword = await bcryptjs.hash(password, 12)

    console.log("💾 Creating user in database...")
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

    console.log("✅ User created successfully:", user.id)
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
    console.error("💥 Registration error:", error)
    console.error("🔍 Error type:", typeof error)
    console.error("🔍 Error constructor:", error?.constructor?.name)
    console.error("🔍 Error details:", {
      message: error?.message,
      code: error?.code,
      meta: error?.meta,
      stack: error?.stack?.split('\n').slice(0, 5).join('\n')
    })
    
    // Check if it's a Prisma error
    if (error?.code) {
      console.error("🔍 Prisma error code:", error.code)
      console.error("🔍 Prisma error meta:", error.meta)
    }
    
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}