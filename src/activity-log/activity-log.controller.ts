import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ActivityLogService } from './activity-log.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { RoleUser } from '../users/entities/user.entity';

@ApiTags('Logs d\'Activité')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('activity-log')
export class ActivityLogController {
  constructor(private readonly activityLogService: ActivityLogService) {}

  @Get()
  @Roles(RoleUser.adm)
  @ApiOperation({ summary: 'Récupérer tous les journaux d\'activité (Admin uniquement)' })
  @ApiResponse({ status: 200, description: 'Liste des logs' })
  @ApiResponse({ status: 403, description: 'Interdit - Rôle insuffisant' })
  findAll() {
    return this.activityLogService.findAll();
  }
}
