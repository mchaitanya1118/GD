import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
export declare class AuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    register(data: any): Promise<{
        user: {
            id: string;
            name: string | null;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            role: import("@prisma/client").$Enums.UserRole;
            tenantId: string;
        };
        token: string;
    }>;
    login(data: any): Promise<{
        user: {
            tenant: {
                id: string;
                name: string;
                createdAt: Date;
                updatedAt: Date;
            };
            id: string;
            name: string | null;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            role: import("@prisma/client").$Enums.UserRole;
            tenantId: string;
        };
        token: string;
    }>;
}
