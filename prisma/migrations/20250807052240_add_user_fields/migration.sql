-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "patentNumber" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "manager" TEXT,
    "contact" TEXT,
    "inventor" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Patent" (
    "id" TEXT NOT NULL,
    "applicationNo" TEXT NOT NULL,
    "patentNo" TEXT,
    "title" TEXT NOT NULL,
    "applicant" TEXT NOT NULL,
    "inventor" TEXT NOT NULL,
    "applicationDate" TIMESTAMP(3) NOT NULL,
    "publicationDate" TIMESTAMP(3),
    "registrationDate" TIMESTAMP(3),
    "status" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Patent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_patentNumber_key" ON "User"("patentNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Patent_applicationNo_key" ON "Patent"("applicationNo");

-- AddForeignKey
ALTER TABLE "Patent" ADD CONSTRAINT "Patent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
