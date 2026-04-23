const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('admin123', 10);

  const tenant = await prisma.tenant.upsert({
    where: { id: 'demo-tenant' },
    update: {},
    create: {
      id: 'demo-tenant',
      name: 'Neqtra Demo Center',
    },
  });

  const admin = await prisma.user.upsert({
    where: { email: 'admin@neqtra.com' },
    update: {},
    create: {
      email: 'admin@neqtra.com',
      name: 'Super Admin',
      password: hashedPassword,
      role: 'ADMIN',
      tenantId: tenant.id,
    },
  });

  const riders = [
    { riderId: 'R001', riderName: 'Zeeshan Ali', vehicleType: 'CAR' },
    { riderId: 'R002', riderName: 'Rahul Sharma', vehicleType: 'BIKE' },
    { riderId: 'R003', riderName: 'Arjun Mehra', vehicleType: 'BIKE' },
  ];

  for (const rider of riders) {
    await prisma.rider.upsert({
      where: { tenantId_riderId: { tenantId: tenant.id, riderId: rider.riderId } },
      update: {},
      create: {
        ...rider,
        tenantId: tenant.id,
      },
    });
  }

  const batches = [
    { batchNumber: 1, rateSingleOrder: 25.0, rateDoubleOrder: 45.0 },
    { batchNumber: 2, rateSingleOrder: 30.0, rateDoubleOrder: 50.0 },
  ];

  for (const batch of batches) {
    await prisma.batch.upsert({
      where: { tenantId_batchNumber: { tenantId: tenant.id, batchNumber: batch.batchNumber } },
      update: {},
      create: {
        ...batch,
        tenantId: tenant.id,
      },
    });
  }

  console.log('Seed data created successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
