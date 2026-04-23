
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const riders = await prisma.rider.findMany();
  console.log('--- RIDERS ---');
  console.dir(riders, { depth: null });
  
  const entries = await prisma.dailyEntry.findMany({ take: 5 });
  console.log('--- LATEST ENTRIES ---');
  console.dir(entries, { depth: null });
  
  const payslips = await prisma.payslip.findMany({ take: 5 });
  console.log('--- LATEST PAYSLIPS ---');
  console.dir(payslips, { depth: null });
}

main().catch(console.error).finally(() => prisma.$disconnect());
