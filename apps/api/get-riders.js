const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const riders = await prisma.rider.findMany({
    take: 10,
    select: { id: true, riderName: true }
  });
  console.log(JSON.stringify(riders, null, 2));
}

main().catch(console.error).finally(() => prisma.$disconnect());
