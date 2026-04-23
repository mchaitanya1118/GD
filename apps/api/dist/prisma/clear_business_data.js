"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('--- Starting Surgical Data Reset ---');
    try {
        await prisma.$transaction(async (tx) => {
            const entryCount = await tx.dailyEntry.deleteMany();
            console.log(`Cleared ${entryCount.count} Daily Entries`);
            const payslipCount = await tx.payslip.deleteMany();
            console.log(`Cleared ${payslipCount.count} Payslips`);
            const batchCount = await tx.batch.deleteMany();
            console.log(`Cleared ${batchCount.count} Batches`);
            const riderCount = await tx.rider.deleteMany();
            console.log(`Cleared ${riderCount.count} Riders`);
        });
        console.log('--- Data Reset Successfully ---');
    }
    catch (error) {
        console.error('Data reset failed:', error);
        process.exit(1);
    }
    finally {
        await prisma.$disconnect();
    }
}
main();
//# sourceMappingURL=clear_business_data.js.map