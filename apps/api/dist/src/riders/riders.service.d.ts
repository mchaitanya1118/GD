import { PrismaService } from '../prisma/prisma.service';
export declare class RidersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createRider(tenantId: string, data: any): Promise<{
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
    getRiders(tenantId: string, filters?: {
        search?: string;
        vehicleType?: string;
        companyCode?: string;
    }): Promise<{
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
    getRidersCount(tenantId: string): Promise<number>;
    deleteRider(tenantId: string, id: string): Promise<{
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
    updateRider(tenantId: string, id: string, data: any): Promise<{
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
