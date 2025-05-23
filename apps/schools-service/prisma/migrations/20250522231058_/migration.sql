/*
  Warnings:

  - You are about to drop the column `administrativecategory` on the `School` table. All the data in the column will be lost.
  - You are about to drop the column `administrativedependence` on the `School` table. All the data in the column will be lost.
  - You are about to drop the column `otheroffers` on the `School` table. All the data in the column will be lost.
  - You are about to drop the column `privatecategory` on the `School` table. All the data in the column will be lost.
  - You are about to drop the column `publicpoweragreement` on the `School` table. All the data in the column will be lost.
  - You are about to drop the column `servicerestriction` on the `School` table. All the data in the column will be lost.
  - You are about to drop the column `teachingmodalitystage` on the `School` table. All the data in the column will be lost.
  - Added the required column `administrativeCategory` to the `School` table without a default value. This is not possible if the table is not empty.
  - Added the required column `administrativeDependence` to the `School` table without a default value. This is not possible if the table is not empty.
  - Added the required column `privateCategory` to the `School` table without a default value. This is not possible if the table is not empty.
  - Added the required column `publicPowerAgreement` to the `School` table without a default value. This is not possible if the table is not empty.
  - Added the required column `serviceRestriction` to the `School` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "School" DROP COLUMN "administrativecategory",
DROP COLUMN "administrativedependence",
DROP COLUMN "otheroffers",
DROP COLUMN "privatecategory",
DROP COLUMN "publicpoweragreement",
DROP COLUMN "servicerestriction",
DROP COLUMN "teachingmodalitystage",
ADD COLUMN     "administrativeCategory" TEXT NOT NULL,
ADD COLUMN     "administrativeDependence" TEXT NOT NULL,
ADD COLUMN     "otherOffers" TEXT,
ADD COLUMN     "privateCategory" TEXT NOT NULL,
ADD COLUMN     "publicPowerAgreement" TEXT NOT NULL,
ADD COLUMN     "serviceRestriction" TEXT NOT NULL,
ADD COLUMN     "teachingModalityStage" TEXT;
