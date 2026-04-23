"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    const tenantId = 'default-tenant-id';
    const vehicleType = 'CAR';
    const carRates = [
        { batch: 1, target: 1.05, noTarget: 1.00 },
        { batch: 2, target: 1.00, noTarget: 0.90 },
        { batch: 3, target: 0.96, noTarget: 0.85 },
        { batch: 4, target: 0.85, noTarget: 0.80 },
        { batch: 5, target: 0.75, noTarget: 0.70 },
        { batch: 6, target: 0.75, noTarget: 0.70 },
        { batch: 7, target: 0.75, noTarget: 0.70 },
    ];
    console.log(`[Seed] Seeding ${carRates.length * 2} rate configurations for CAR...`);
    for (const r of carRates) {
        await prisma.rateConfig.upsert({
            where: {
                tenantId_batchNumber_vehicleType_rateType: {
                    tenantId,
                    batchNumber: r.batch,
                    vehicleType,
                    rateType: 'TARGET',
                },
            },
            update: {
                riderRateSingle: r.target,
                riderRateDouble: r.target,
                companyRateSingle: r.target,
                companyRateDouble: r.target,
            },
            create: {
                tenantId,
                batchNumber: r.batch,
                vehicleType,
                rateType: 'TARGET',
                riderRateSingle: r.target,
                riderRateDouble: r.target,
                companyRateSingle: r.target,
                companyRateDouble: r.target,
            },
        });
        await prisma.rateConfig.upsert({
            where: {
                tenantId_batchNumber_vehicleType_rateType: {
                    tenantId,
                    batchNumber: r.batch,
                    vehicleType,
                    rateType: 'NO_TARGET',
                },
            },
            update: {
                riderRateSingle: r.noTarget,
                riderRateDouble: r.noTarget,
                companyRateSingle: r.noTarget,
                companyRateDouble: r.noTarget,
            },
            create: {
                tenantId,
                batchNumber: r.batch,
                vehicleType,
                rateType: 'NO_TARGET',
                riderRateSingle: r.noTarget,
                riderRateDouble: r.noTarget,
                companyRateSingle: r.noTarget,
                companyRateDouble: r.noTarget,
            },
        });
    }
    console.log('[Seed] CAR rates successfully seeded.');
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed_car_rates.js.map