/*
  Warnings:

  - You are about to drop the column `email` on the `School` table. All the data in the column will be lost.
  - Added the required column `city` to the `School` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uf` to the `School` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "School_email_key";

-- DropIndex
DROP INDEX "School_phone_key";

-- AlterTable
ALTER TABLE "School" DROP COLUMN "email",
ADD COLUMN     "address" TEXT,
ADD COLUMN     "administrativecategory" TEXT,
ADD COLUMN     "administrativedependence" TEXT,
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "latitude" TEXT,
ADD COLUMN     "locality" TEXT,
ADD COLUMN     "location" TEXT,
ADD COLUMN     "longitude" TEXT,
ADD COLUMN     "otheroffers" TEXT,
ADD COLUMN     "privatecategory" TEXT,
ADD COLUMN     "publicpoweragreement" TEXT,
ADD COLUMN     "regulation" TEXT,
ADD COLUMN     "servicerestriction" TEXT,
ADD COLUMN     "size" TEXT,
ADD COLUMN     "teachingmodalitystage" TEXT,
ADD COLUMN     "uf" TEXT NOT NULL,
ALTER COLUMN "phone" DROP NOT NULL;
