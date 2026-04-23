import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('--- Starting Surgical Data Reset ---');

  try {
    await prisma.$transaction(async (tx) => {
      // Delete in order to satisfy foreign key constraints
      
      const entryCount = await tx.dailyEntry.deleteMany();
      console.log(`Cleared ${entryCount.count} Daily Entries`);

      const payslipCount = await tx.payslip.deleteMany();
      console.log(`Cleared ${payslipCount.count} Payslips`);

      const batchCount = await tx.batch.deleteMany();
      console.log(`Cleared ${batchCount.count} Batches`);

      const riderCount = await tx.rider.deleteMany();
      console.log(`Cleared ${riderCount.count} Riders`);

      // We preserve Users and Tenants
    });

    console.log('--- Data Reset Successfully ---');
  } catch (error) {
    console.error('Data reset failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
