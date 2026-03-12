import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { PeriodeService } from './periode.service';
import { CreatePeriodeDto } from './dto/create-periode.dto';
import { UpdatePeriodeDto } from './dto/update-periode.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { RoleUser } from '../users/entities/user.entity';

@ApiTags('Périodes Scolaires')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('periode')
export class PeriodeController {
  constructor(private readonly periodeService: PeriodeService) {}

  @Post()
  @Roles(RoleUser.adm, RoleUser.dir)
  @ApiOperation({ summary: 'Créer une nouvelle période' })
  @ApiResponse({ status: 201, description: 'Période créée avec succès' })
  @ApiResponse({ status: 403, description: 'Interdit - Rôle insuffisant' })
  create(@Body() dto: CreatePeriodeDto) {
    return this.periodeService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer toutes les périodes' })
  @ApiQuery({ name: 'anneeId', required: false, description: 'ID de l\'année scolaire (optionnel)' })
  findAll(@Query('anneeId') anneeId?: string) {
    return this.periodeService.findAll(anneeId ? +anneeId : undefined);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer une période par son ID' })
  @ApiResponse({ status: 200, description: 'Détails de la période' })
  @ApiResponse({ status: 404, description: 'Période non trouvée' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.periodeService.findOne(id);
  }

  @Patch(':id')
  @Roles(RoleUser.adm, RoleUser.dir)
  @ApiOperation({ summary: 'Modifier une période' })
  @ApiResponse({ status: 403, description: 'Interdit - Rôle insuffisant' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdatePeriodeDto) {
    return this.periodeService.update(id, dto);
  }

  @Delete(':id')
  @Roles(RoleUser.adm, RoleUser.dir)
  @ApiOperation({ summary: 'Supprimer une période' })
  @ApiResponse({ status: 403, description: 'Interdit - Rôle insuffisant' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.periodeService.remove(id);
  }
}
