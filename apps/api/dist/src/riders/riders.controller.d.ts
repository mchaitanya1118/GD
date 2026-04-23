import { RidersService } from './riders.service';
export declare class RidersController {
    private readonly ridersService;
    constructor(ridersService: RidersService);
    createRider(req: any, body: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        tenantId: string;
        vehicleType: import("@prisma/client").$Enums.VehicleType;
        rateType: import("@prisma/client").$Enums.RateType;
        riderId: string;
        riderName: string;
        companyCode: string | null;
    }>;
    getRiders(req: any, search?: string, vehicleType?: string, companyCode?: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        tenantId: string;
        vehicleType: import("@prisma/client").$Enums.VehicleType;
        rateType: import("@prisma/client").$Enums.RateType;
        riderId: string;
        riderName: string;
        companyCode: string | null;
    }[]>;
    getRidersCount(req: any): Promise<number>;
    deleteRider(req: any, id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        tenantId: string;
        vehicleType: import("@prisma/client").$Enums.VehicleType;
        rateType: import("@prisma/client").$Enums.RateType;
        riderId: string;
        riderName: string;
        companyCode: string | null;
    }>;
    updateRider(req: any, id: string, body: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        tenantId: string;
        vehicleType: import("@prisma/client").$Enums.VehicleType;
        rateType: import("@prisma/client").$Enums.RateType;
        riderId: string;
        riderName: string;
        companyCode: string | null;
    }>;
}
