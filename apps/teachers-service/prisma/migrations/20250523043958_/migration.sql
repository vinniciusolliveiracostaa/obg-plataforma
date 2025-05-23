-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- CreateEnum
CREATE TYPE "Race" AS ENUM ('WHITE', 'BLACK', 'BROWN', 'YELLOW', 'INDIGENOUS');

-- CreateEnum
CREATE TYPE "SpecialCategories" AS ENUM ('INDIGENOUS', 'RIVERSIDECOMUNITIES', 'BLACKPOPULATION', 'QUILOMBOLA', 'PCD', 'OTHERTRADITIONALCOMMUNITIES');

-- CreateEnum
CREATE TYPE "LevelOfEducation" AS ENUM ('EF9', 'EM1', 'EM2', 'EM3');

-- CreateTable
CREATE TABLE "Teacher" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "phone" TEXT,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "gender" "Gender" NOT NULL,
    "colorRace" "Race" NOT NULL,
    "specialCategories" "SpecialCategories"[] DEFAULT ARRAY[]::"SpecialCategories"[],
    "schoolsId" TEXT[],
    "teamsId" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Teacher_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_email_key" ON "Teacher"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_cpf_key" ON "Teacher"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_phone_key" ON "Teacher"("phone");
