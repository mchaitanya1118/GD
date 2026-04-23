import { PrismaService } from '../prisma/prisma.service';
export declare class ReportsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private escapeCsv;
    exportPayrollCsv(tenantId: string, month: number, year: number): Promise<string>;
    exportRidersCsv(tenantId: string): Promise<string>;
}
