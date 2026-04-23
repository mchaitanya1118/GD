import { RatesService } from './rates.service';
export declare class RatesController {
    private readonly ratesService;
    constructor(ratesService: RatesService);
    findAll(req: any): Promise<{
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
    upsert(req: any, body: any): Promise<{
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
    remove(req: any, id: string): Promise<{
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
}
