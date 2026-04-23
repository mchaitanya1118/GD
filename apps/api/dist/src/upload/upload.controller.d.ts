import { UploadService } from './upload.service';
export declare class UploadController {
    private readonly uploadService;
    constructor(uploadService: UploadService);
    previewExcel(req: any, file: any): Promise<any[]>;
    uploadExcel(req: any, file: any, mappingStr?: string, monthStr?: string, yearStr?: string): Promise<{
        message: string;
        processed: number;
        newRiders: number;
        newBatches: number;
        errors: string[];
    }>;
    resetData(req: any): Promise<{
        success: boolean;
        message: string;
    }>;
}
