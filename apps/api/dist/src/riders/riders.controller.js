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
exports.RidersController = void 0;
const common_1 = require("@nestjs/common");
const riders_service_1 = require("./riders.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let RidersController = class RidersController {
    ridersService;
    constructor(ridersService) {
        this.ridersService = ridersService;
    }
    async createRider(req, body) {
        return this.ridersService.createRider(req.user.tenantId, body);
    }
    async getRiders(req, search, vehicleType, companyCode) {
        return this.ridersService.getRiders(req.user.tenantId, {
            search,
            vehicleType,
            companyCode,
        });
    }
    async getRidersCount(req) {
        return this.ridersService.getRidersCount(req.user.tenantId);
    }
    async deleteRider(req, id) {
        return this.ridersService.deleteRider(req.user.tenantId, id);
    }
    async updateRider(req, id, body) {
        return this.ridersService.updateRider(req.user.tenantId, id, body);
    }
};
exports.RidersController = RidersController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], RidersController.prototype, "createRider", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)('search')),
    __param(2, (0, common_1.Query)('vehicleType')),
    __param(3, (0, common_1.Query)('companyCode')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String]),
    __metadata("design:returntype", Promise)
], RidersController.prototype, "getRiders", null);
__decorate([
    (0, common_1.Get)('count'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RidersController.prototype, "getRidersCount", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], RidersController.prototype, "deleteRider", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], RidersController.prototype, "updateRider", null);
exports.RidersController = RidersController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('riders'),
    __metadata("design:paramtypes", [riders_service_1.RidersService])
], RidersController);
//# sourceMappingURL=riders.controller.js.map