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
exports.RidersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let RidersService = class RidersService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createRider(tenantId, data) {
        return this.prisma.rider.create({
            data: {
                tenantId,
                riderId: data.rider_id,
                riderName: data.rider_name,
                vehicleType: data.vehicle_type === 'CAR' ? 'CAR' : 'BIKE',
                rateType: data.rate_type || 'TARGET',
                companyCode: data.company_code || null,
            },
        });
    }
    async getRiders(tenantId, filters = {}) {
        const where = { tenantId };
        if (filters.search) {
            where.OR = [
                { riderId: { contains: filters.search, mode: 'insensitive' } },
                { riderName: { contains: filters.search, mode: 'insensitive' } },
            ];
        }
        if (filters.vehicleType && filters.vehicleType !== 'ALL') {
            where.vehicleType = filters.vehicleType;
        }
        if (filters.companyCode && filters.companyCode !== 'ALL') {
            where.companyCode = {
                contains: filters.companyCode,
                mode: 'insensitive',
            };
        }
        return this.prisma.rider.findMany({ where });
    }
    async getRidersCount(tenantId) {
        return this.prisma.rider.count({
            where: { tenantId }
        });
    }
    async deleteRider(tenantId, id) {
        await this.prisma.dailyEntry.deleteMany({ where: { riderId: id } });
        await this.prisma.payslip.deleteMany({ where: { riderId: id } });
        return this.prisma.rider.delete({
            where: { id, tenantId },
        });
    }
    async updateRider(tenantId, id, data) {
        return this.prisma.rider.update({
            where: { id, tenantId },
            data: {
                riderName: data.rider_name,
                vehicleType: data.vehicle_type === 'CAR' ? 'CAR' : 'BIKE',
                rateType: data.rate_type,
                companyCode: data.company_code || null,
            },
        });
    }
};
exports.RidersService = RidersService;
exports.RidersService = RidersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RidersService);
//# sourceMappingURL=riders.service.js.map