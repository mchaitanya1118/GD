-- AlterTable
ALTER TABLE "DailyEntry" ADD COLUMN     "cashCollected" DOUBLE PRECISION DEFAULT 0,
ADD COLUMN     "orders" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "status" TEXT DEFAULT 'working';

-- AlterTable
ALTER TABLE "Rider" ADD COLUMN     "groupId" TEXT,
ADD COLUMN     "nationality" TEXT,
ADD COLUMN     "status" TEXT DEFAULT 'ACTIVE',
ADD COLUMN     "vehicleModel" TEXT,
ADD COLUMN     "vehicleNumber" TEXT,
ADD COLUMN     "vehicleOwnership" TEXT,
ADD COLUMN     "zone" TEXT;

-- CreateTable
CREATE TABLE "RiderGroup" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RiderGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GroupRate" (
    "id" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,
    "vehicleType" "VehicleType" NOT NULL,
    "rateType" "RateType" NOT NULL DEFAULT 'TARGET',
    "targetCount" INTEGER NOT NULL DEFAULT 300,
    "riderRateSingle" DOUBLE PRECISION NOT NULL,
    "riderRateDouble" DOUBLE PRECISION NOT NULL,
    "companyRateSingle" DOUBLE PRECISION NOT NULL,
    "companyRateDouble" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GroupRate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RiderGroup_tenantId_name_key" ON "RiderGroup"("tenantId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "GroupRate_groupId_vehicleType_rateType_key" ON "GroupRate"("groupId", "vehicleType", "rateType");

-- AddForeignKey
ALTER TABLE "Rider" ADD CONSTRAINT "Rider_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "RiderGroup"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RiderGroup" ADD CONSTRAINT "RiderGroup_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupRate" ADD CONSTRAINT "GroupRate_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "RiderGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;
