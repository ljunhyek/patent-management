-- Patent Management Database Setup v2
-- Run this SQL in Supabase SQL Editor

-- Drop existing tables if they exist
DROP TABLE IF EXISTS "Patent";
DROP TABLE IF EXISTS "User";

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create User table
CREATE TABLE "User" (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    "patentNumber" VARCHAR(12) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    manager VARCHAR(255),
    contact VARCHAR(255),
    inventor VARCHAR(255),
    "userType" VARCHAR(10) NOT NULL,
    "termsAgreed" BOOLEAN NOT NULL DEFAULT false,
    "privacyAgreed" BOOLEAN NOT NULL DEFAULT false,
    "emailAgreed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Patent table
CREATE TABLE "Patent" (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "applicationNo" VARCHAR(255) UNIQUE NOT NULL,
    "registrationNo" VARCHAR(255),
    title VARCHAR(500) NOT NULL,
    applicant VARCHAR(255) NOT NULL,
    inventor VARCHAR(255) NOT NULL,
    "applicationDate" TIMESTAMP WITH TIME ZONE NOT NULL,
    "publicationDate" TIMESTAMP WITH TIME ZONE,
    "registrationDate" TIMESTAMP WITH TIME ZONE,
    "pctDeadline" TIMESTAMP WITH TIME ZONE,
    "pctNumber" VARCHAR(255),
    status VARCHAR(50) NOT NULL,
    "userId" UUID NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    FOREIGN KEY ("userId") REFERENCES "User"(id)
);

-- Create indexes for better performance
CREATE INDEX "User_email_idx" ON "User"(email);
CREATE INDEX "User_patentNumber_idx" ON "User"("patentNumber");
CREATE INDEX "Patent_applicationNo_idx" ON "Patent"("applicationNo");
CREATE INDEX "Patent_userId_idx" ON "Patent"("userId");

-- Update trigger for updatedAt
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW."updatedAt" = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_user_updated_at BEFORE UPDATE ON "User" 
    FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_patent_updated_at BEFORE UPDATE ON "Patent" 
    FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();