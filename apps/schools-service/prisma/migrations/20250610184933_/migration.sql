-- CreateTable
CREATE TABLE "School" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "inep" TEXT NOT NULL,
    "uf" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "locality" TEXT NOT NULL,
    "administrativeCategory" TEXT NOT NULL,
    "serviceRestriction" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phone" TEXT,
    "administrativeDependence" TEXT NOT NULL,
    "privateCategory" TEXT NOT NULL,
    "publicPowerAgreement" TEXT NOT NULL,
    "regulation" TEXT,
    "size" TEXT,
    "teachingModalityStage" TEXT,
    "otherOffers" TEXT,
    "latitude" TEXT,
    "longitude" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "School_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "School_inep_key" ON "School"("inep");
