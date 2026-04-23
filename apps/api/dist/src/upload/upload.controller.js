"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const upload_service_1 = require("./upload.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let UploadController = class UploadController {
    uploadService;
    constructor(uploadService) {
        this.uploadService = uploadService;
    }
    async previewExcel(req, file) {
        console.log('[UploadController] Preview requested. File received:', !!file);
        if (file) {
            console.log('[UploadController] File size:', file.size, 'Mimetype:', file.mimetype);
        }
        if (!file)
            throw new common_1.BadRequestException('No file uploaded');
        try {
            return await this.uploadService.getHeaders(file.buffer);
        }
        catch (err) {
            console.error('[UploadController] Preview failed:', err);
            throw new common_1.BadRequestException('Failed to read Excel file: ' + err.message);
        }
    }
    async uploadExcel(req, file, mappingStr, monthStr, yearStr) {
        if (!file) {
            throw new common_1.BadRequestException('No file uploaded');
        }
        const tenantId = req.user.tenantId;
        let mapping = undefined;
        if (mappingStr) {
            try {
                mapping = JSON.parse(mappingStr);
            }
            catch (e) {
                console.warn('Failed to parse mapping JSON', mappingStr);
            }
        }
        const month = monthStr ? parseInt(monthStr) : undefined;
        const year = yearStr ? parseInt(yearStr) : undefined;
        return this.uploadService.processExcel(file.buffer, tenantId, mapping, month, year);
    }
    async resetData(req) {
        const tenantId = req.user.tenantId;
        return this.uploadService.resetTenantData(tenantId);
    }
};
exports.UploadController = UploadController;
__decorate([
    (0, common_1.Post)('preview'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "previewExcel", null);
__decorate([
    (0, common_1.Post)('excel'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, common_1.Body)('mapping')),
    __param(3, (0, common_1.Body)('month')),
    __param(4, (0, common_1.Body)('year')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String, String, String]),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "uploadExcel", null);
__decorate([
    (0, common_1.Post)('reset'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "resetData", null);
exports.UploadController = UploadController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('upload'),
    __metadata("design:paramtypes", [upload_service_1.UploadService])
], UploadController);
//# sourceMappingURL=upload.controller.js.map