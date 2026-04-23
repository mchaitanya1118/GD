
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const riders = await prisma.rider.count();
  const payslips = await prisma.payslip.count();
  const batches = await prisma.batch.count();
  const entries = await prisma.dailyEntry.count();
  const users = await prisma.user.count();
  const tenants = await prisma.tenant.count();

  console.log('--- Database Stats ---');
  console.log('Tenants:', tenants);
  console.log('Users:', users);
  console.log('Riders:', riders);
  console.log('Payslips:', payslips);
  console.log('Batches:', batches);
  console.log('Daily Entries:', entries);
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
