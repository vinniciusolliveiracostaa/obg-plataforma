/*
  Warnings:

  - A unique constraint covering the columns `[studentsId]` on the table `Team` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Team_studentsId_key" ON "Team"("studentsId");
