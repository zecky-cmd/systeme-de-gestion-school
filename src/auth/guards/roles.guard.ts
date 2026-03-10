import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { RoleUser } from '../../users/entities/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<RoleUser[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        // S'il n'y a pas de rôles spécifiés, on laisse passer (route ouverte)
        if (!requiredRoles) {
            return true;
        }

        const { user } = context.switchToHttp().getRequest();

        // Si l'utilisateur n'est pas authentifié (pas de token valide ou Guard absent)
        if (!user) {
            return false;
        }

        // Vérifie si le rôle de l'utilisateur correspond à un des rôles requis
        return requiredRoles.includes(user.role);
    }
}
