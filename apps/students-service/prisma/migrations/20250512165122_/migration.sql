/*
  Warnings:

  - Made the column `birthDate` on table `Student` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Student" ALTER COLUMN "birthDate" SET NOT NULL;
