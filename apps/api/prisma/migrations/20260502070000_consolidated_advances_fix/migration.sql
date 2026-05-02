-- CreateTable
CREATE TABLE "Advance" (
    "id" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "balance" DOUBLE PRECISION NOT NULL,
    "reason" TEXT,
    "riderId" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Advance_pkey" PRIMARY KEY ("id")
);

-- AlterTable
ALTER TABLE "Payslip" ADD COLUMN "advanceDeduction" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- AddForeignKey
ALTER TABLE "Advance" ADD CONSTRAINT "Advance_riderId_fkey" FOREIGN KEY ("riderId") REFERENCES "Rider"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Advance" ADD CONSTRAINT "Advance_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
