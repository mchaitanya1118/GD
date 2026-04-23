import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(body: any): Promise<{
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
    login(body: any): Promise<{
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
