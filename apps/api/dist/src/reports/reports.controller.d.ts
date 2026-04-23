import { ReportsService } from './reports.service';
export declare class ReportsController {
    private readonly reportsService;
    constructor(reportsService: ReportsService);
    exportPayroll(req: any, month: string, year: string, res: any): Promise<void>;
    exportRiders(req: any, res: any): Promise<void>;
}
