import { BatchesService } from './batches.service';
export declare class BatchesController {
    private readonly batchesService;
    constructor(batchesService: BatchesService);
    createBatch(req: any, body: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        tenantId: string;
        batchNumber: number;
        rateSingleOrder: number;
        rateDoubleOrder: number;
    }>;
    getBatches(req: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        tenantId: string;
        batchNumber: number;
        rateSingleOrder: number;
        rateDoubleOrder: number;
    }[]>;
}
