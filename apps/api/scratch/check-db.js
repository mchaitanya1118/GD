const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
  const riders = await prisma.rider.count();
  const entries = await prisma.dailyEntry.count();
  const slips = await prisma.payslip.count();
  const batches = await prisma.batch.count();
  
  console.log('Riders:', riders);
  console.log('DailyEntries:', entries);
  console.log('Payslips:', slips);
  console.log('Batches:', batches);
  
  if (entries > 0) {
    const sampleEntry = await prisma.dailyEntry.findFirst();
    console.log('Sample DailyEntry:', sampleEntry);
  }
  
  if (slips > 0) {
    const sampleSlip = await prisma.payslip.findFirst();
    console.log('Sample Payslip:', sampleSlip);
  }
  
  if (riders > 0) {
     const sampleRider = await prisma.rider.findFirst();
     console.log('Sample Rider:', sampleRider);
  }
}

check().catch(console.error).finally(() => prisma.$disconnect());
