-- CreateTable
CREATE TABLE "School" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "inep" TEXT NOT NULL,
    "uf" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "locality" TEXT NOT NULL,
    "administrativecategory" TEXT NOT NULL,
    "servicerestriction" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phone" TEXT,
    "administrativedependence" TEXT NOT NULL,
    "privatecategory" TEXT NOT NULL,
    "publicpoweragreement" TEXT NOT NULL,
    "regulation" TEXT,
    "size" TEXT,
    "teachingmodalitystage" TEXT,
    "otheroffers" TEXT,
    "latitude" TEXT,
    "longitude" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "School_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "School_inep_key" ON "School"("inep");
