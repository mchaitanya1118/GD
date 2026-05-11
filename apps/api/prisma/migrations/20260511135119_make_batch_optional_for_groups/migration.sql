-- DropForeignKey
ALTER TABLE "DailyEntry" DROP CONSTRAINT "DailyEntry_batchId_fkey";

-- AlterTable
ALTER TABLE "DailyEntry" ALTER COLUMN "batchId" DROP NOT NULL,
ALTER COLUMN "autoRateSingle" DROP NOT NULL,
ALTER COLUMN "autoRateSingle" SET DEFAULT 0,
ALTER COLUMN "autoRateDouble" DROP NOT NULL,
ALTER COLUMN "autoRateDouble" SET DEFAULT 0;

-- AddForeignKey
ALTER TABLE "DailyEntry" ADD CONSTRAINT "DailyEntry_batchId_fkey" FOREIGN KEY ("batchId") REFERENCES "Batch"("id") ON DELETE SET NULL ON UPDATE CASCADE;
