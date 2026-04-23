const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const tenantId = 'demo-tenant';
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();

    // 1. Get riders
    const riders = await prisma.rider.findMany({ where: { tenantId } });
    if (riders.length === 0) {
        console.log('No riders found. Please run seed.js first.');
        return;
    }

    // 2. Get batches
    const batches = await prisma.batch.findMany({ where: { tenantId } });
    const batch1 = batches.find(b => b.batchNumber === 1);

    console.log(`Seeding slips for ${riders.length} riders...`);

    for (const rider of riders) {
        // Create 5 daily entries for each rider
        for (let day = 1; day <= 5; day++) {
            const date = new Date(Date.UTC(year, month - 1, day));
            await prisma.dailyEntry.upsert({
                where: {
                    riderId_date: { riderId: rider.id, date }
                },
                update: {},
                create: {
                    riderId: rider.id,
                    date,
                    batchId: batch1.id,
                    singleOrders: Math.floor(Math.random() * 10) + 5,
                    doubleOrders: Math.floor(Math.random() * 5),
                    autoRateSingle: 25,
                    autoRateDouble: 45,
                    dailyAmount: 200 + (Math.random() * 50)
                }
            });
        }

        // Create the payslip
        await prisma.payslip.upsert({
            where: {
                tenantId_riderId_month_year: { tenantId, riderId: rider.id, month, year }
            },
            update: {},
            create: {
                tenantId,
                riderId: rider.id,
                month,
                year,
                totalSingleOrders: 50,
                totalDoubleOrders: 10,
                grossAmount: 1500 + (Math.random() * 500),
                netTotal: 1400 + (Math.random() * 500),
                bonus: 100,
                deductions: 50,
                status: 'FINAL'
            }
        });
    }

    console.log('Payroll seed complete.');
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());
