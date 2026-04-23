import { PrismaService } from '../prisma/prisma.service';
export declare class RatesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(tenantId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        tenantId: string;
        batchNumber: number;
        vehicleType: import("@prisma/client").$Enums.VehicleType;
        rateType: import("@prisma/client").$Enums.RateType;
        riderRateSingle: number;
        riderRateDouble: number;
        companyRateSingle: number;
        companyRateDouble: number;
    }[]>;
    upsert(tenantId: string, data: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        tenantId: string;
        batchNumber: number;
        vehicleType: import("@prisma/client").$Enums.VehicleType;
        rateType: import("@prisma/client").$Enums.RateType;
        riderRateSingle: number;
        riderRateDouble: number;
        companyRateSingle: number;
        companyRateDouble: number;
    }>;
    remove(tenantId: string, id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        tenantId: string;
        batchNumber: number;
        vehicleType: import("@prisma/client").$Enums.VehicleType;
        rateType: import("@prisma/client").$Enums.RateType;
        riderRateSingle: number;
        riderRateDouble: number;
        companyRateSingle: number;
        companyRateDouble: number;
    }>;
    findOne(tenantId: string, batchNumber: number, vehicleType: any, rateType?: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        tenantId: string;
        batchNumber: number;
        vehicleType: import("@prisma/client").$Enums.VehicleType;
        rateType: import("@prisma/client").$Enums.RateType;
        riderRateSingle: number;
        riderRateDouble: number;
        companyRateSingle: number;
        companyRateDouble: number;
    } | null>;
}
