-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- CreateEnum
CREATE TYPE "Race" AS ENUM ('WHITE', 'BLACK', 'BROWN', 'YELLOW', 'INDIGENOUS');

-- CreateEnum
CREATE TYPE "SpecialCategories" AS ENUM ('INDIGENOUS', 'RIVERSIDECOMUNITIES', 'BLACKPOPULATION', 'QUILOMBOLA', 'PCD', 'OTHERTRADITIONALCOMMUNITIES');

-- CreateEnum
CREATE TYPE "LevelOfEducation" AS ENUM ('EF9', 'EM1', 'EM2', 'EM3');

-- CreateTable
CREATE TABLE "Student" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "nis" TEXT,
    "motherName" TEXT NOT NULL,
    "phone" TEXT,
    "birthDate" TIMESTAMP(3),
    "levelOfEducation" "LevelOfEducation" NOT NULL,
    "gender" "Gender" NOT NULL,
    "colorRace" "Race" NOT NULL,
    "specialCategories" "SpecialCategories"[] DEFAULT ARRAY[]::"SpecialCategories"[],
    "schoolId" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Student_email_key" ON "Student"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Student_cpf_key" ON "Student"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Student_nis_key" ON "Student"("nis");

-- CreateIndex
CREATE UNIQUE INDEX "Student_phone_key" ON "Student"("phone");
