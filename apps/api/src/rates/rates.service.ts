import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RatesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(tenantId: string) {
    return this.prisma.rateConfig.findMany({
      where: { tenantId },
      orderBy: [
        { batchNumber: 'asc' },
        { vehicleType: 'asc' }
      ]
    });
  }

  async upsert(tenantId: string, data: any) {
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

  async remove(tenantId: string, id: string) {
    const config = await this.prisma.rateConfig.findUnique({ where: { id } });
    if (!config || config.tenantId !== tenantId) {
      throw new NotFoundException('Rate configuration not found');
    }

    return this.prisma.rateConfig.delete({ where: { id } });
  }

  async findOne(tenantId: string, batchNumber: number, vehicleType: any, rateType: any = 'TARGET') {
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
}
