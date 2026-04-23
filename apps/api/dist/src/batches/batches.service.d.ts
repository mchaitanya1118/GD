import { PrismaService } from '../prisma/prisma.service';
export declare class BatchesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createBatch(tenantId: string, data: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        tenantId: string;
        batchNumber: number;
        rateSingleOrder: number;
        rateDoubleOrder: number;
    }>;
    getBatches(tenantId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        tenantId: string;
        batchNumber: number;
        rateSingleOrder: number;
        rateDoubleOrder: number;
    }[]>;
}
