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
exports.RatesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let RatesService = class RatesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(tenantId) {
        return this.prisma.rateConfig.findMany({
            where: { tenantId },
            orderBy: [
                { batchNumber: 'asc' },
                { vehicleType: 'asc' }
            ]
        });
    }
    async upsert(tenantId, data) {
        const { batchNumber, vehicleType, rateType, companyRateSingle, companyRateDouble, riderRateSingle, riderRateDouble } = data;
        return this.prisma.rateConfig.upsert({
            where: {
                tenantId_batchNumber_vehicleType_rateType: {
                    tenantId,
                    batchNumber: Number(batchNumber),
                    vehicleType,
                    rateType: rateType || 'TARGET'
                }
            },
            update: {
                companyRateSingle: Number(companyRateSingle),
                companyRateDouble: Number(companyRateDouble),
                riderRateSingle: Number(riderRateSingle),
                riderRateDouble: Number(riderRateDouble)
            },
            create: {
                tenantId,
                batchNumber: Number(batchNumber),
                vehicleType,
                rateType: rateType || 'TARGET',
                companyRateSingle: Number(companyRateSingle),
                companyRateDouble: Number(companyRateDouble),
                riderRateSingle: Number(riderRateSingle),
                riderRateDouble: Number(riderRateDouble)
            }
        });
    }
    async remove(tenantId, id) {
        const config = await this.prisma.rateConfig.findUnique({ where: { id } });
        if (!config || config.tenantId !== tenantId) {
            throw new common_1.NotFoundException('Rate configuration not found');
        }
        return this.prisma.rateConfig.delete({ where: { id } });
    }
    async findOne(tenantId, batchNumber, vehicleType, rateType = 'TARGET') {
        return this.prisma.rateConfig.findUnique({
            where: {
                tenantId_batchNumber_vehicleType_rateType: {
                    tenantId,
                    batchNumber,
                    vehicleType,
                    rateType
                }
            }
        });
    }
};
exports.RatesService = RatesService;
exports.RatesService = RatesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RatesService);
//# sourceMappingURL=rates.service.js.map