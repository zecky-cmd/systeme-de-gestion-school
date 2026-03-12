import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { SanctionService } from './sanction.service';
import { CreateSanctionDto } from './dto/create-sanction.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { RoleUser } from '../users/entities/user.entity';

@ApiTags('Sanctions')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('sanction')
export class SanctionController {
  constructor(private readonly sanctionService: SanctionService) {}

  @Post()
  @Roles(RoleUser.adm, RoleUser.dir)
  @ApiOperation({ summary: 'Enregistrer une nouvelle sanction' })
  @ApiResponse({ status: 201, description: 'Sanction enregistrée avec succès' })
  @ApiResponse({ status: 403, description: 'Interdit - Rôle insuffisant' })
  create(@Body() dto: CreateSanctionDto) {
    return this.sanctionService.create(dto);
  }

  @Get()
  @Roles(RoleUser.adm, RoleUser.dir, RoleUser.par, RoleUser.elv)
  @ApiOperation({ summary: 'Récupérer les sanctions d\'un élève' })
  @ApiQuery({ name: 'eleveId', required: false, description: 'Filtrer par élève' })
  @ApiResponse({ status: 403, description: 'Interdit - Rôle insuffisant' })
  findAll(@Query('eleveId') eleveId?: string) {
    return this.sanctionService.findAll(eleveId ? +eleveId : undefined);
  }

  @Delete(':id')
  @Roles(RoleUser.adm, RoleUser.dir)
  @ApiOperation({ summary: 'Supprimer une sanction' })
  @ApiResponse({ status: 403, description: 'Interdit - Rôle insuffisant' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.sanctionService.remove(id);
  }
}
