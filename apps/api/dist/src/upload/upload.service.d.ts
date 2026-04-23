import { PrismaService } from '../prisma/prisma.service';
import { RatesService } from '../rates/rates.service';
export declare class UploadService {
    private readonly prisma;
    private readonly ratesService;
    constructor(prisma: PrismaService, ratesService: RatesService);
    private ensureTenantExists;
    processExcel(buffer: Buffer, tenantId: string, mapping?: Record<string, string>, payrollMonth?: number, payrollYear?: number): Promise<{
        message: string;
        processed: number;
        newRiders: number;
        newBatches: number;
        errors: string[];
    }>;
    private getCol;
    private resolveValue;
    private evaluateFormula;
    getHeaders(buffer: Buffer): Promise<any[]>;
    private parseDate;
    private parseNumber;
    private scoreHeaderRow;
    private syncPayslip;
    resetTenantData(tenantId: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
