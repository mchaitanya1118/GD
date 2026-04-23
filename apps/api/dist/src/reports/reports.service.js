"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ReportsService = class ReportsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    escapeCsv(val) {
        if (val === null || val === undefined)
            return '""';
        const str = String(val).replace(/"/g, '""');
        return `"${str}"`;
    }
    async exportPayrollCsv(tenantId, month, year) {
        const slips = await this.prisma.payslip.findMany({
            where: { tenantId, month, year },
            include: { rider: true },
        });
        const headers = [
            'Rider ID', 'Rider Name', 'Vehicle Type', 'Single Orders', 'Double Orders',
            'Gross Amount', 'Bonus', 'Deductions', 'Sales Cash', 'Car Rent',
            'Akama', 'Fine', 'Bank Deduction', 'Net Total', 'Status'
        ];
        const rows = slips.map(s => [
            s.rider.riderId,
            s.rider.riderName,
            s.rider.vehicleType,
            s.totalSingleOrders,
            s.totalDoubleOrders,
            s.grossAmount,
            s.bonus,
            s.deductions,
            s.salesCash,
            s.carRent,
            s.akama,
            s.fine,
            s.bankDeduction,
            s.netTotal,
            s.status
        ]);
        const csvContent = [
            headers.map(h => this.escapeCsv(h)).join(','),
            ...rows.map(row => row.map(cell => this.escapeCsv(cell)).join(','))
        ].join('\n');
        return csvContent;
    }
    async exportRidersCsv(tenantId) {
        const riders = await this.prisma.rider.findMany({
            where: { tenantId },
        });
        const headers = ['Rider ID', 'Rider Name', 'Vehicle Type', 'Rate Type', 'Company Code', 'Created At'];
        const rows = riders.map(r => [
            r.riderId,
            r.riderName,
            r.vehicleType,
            r.rateType,
            r.companyCode || '',
            r.createdAt.toISOString()
        ]);
        const csvContent = [
            headers.map(h => this.escapeCsv(h)).join(','),
            ...rows.map(row => row.map(cell => this.escapeCsv(cell)).join(','))
        ].join('\n');
        return csvContent;
    }
};
exports.ReportsService = ReportsService;
exports.ReportsService = ReportsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ReportsService);
//# sourceMappingURL=reports.service.js.map