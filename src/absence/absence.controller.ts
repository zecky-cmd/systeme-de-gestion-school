import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { AbsenceService } from './absence.service';
import { CreateAbsenceDto } from './dto/create-absence.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { RoleUser } from '../users/entities/user.entity';

@ApiTags('Absences')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('absence')
export class AbsenceController {
  constructor(private readonly absenceService: AbsenceService) {}

  @Post()
  @Roles(RoleUser.adm, RoleUser.dir, RoleUser.ens)
  @ApiOperation({ summary: 'Enregistrer une absence' })
  @ApiResponse({ status: 201, description: 'Absence enregistrée avec succès' })
  @ApiResponse({ status: 403, description: 'Interdit - Rôle insuffisant' })
  create(@Body() dto: CreateAbsenceDto) {
    return this.absenceService.create(dto);
  }

  @Get()
  @Roles(RoleUser.adm, RoleUser.dir, RoleUser.ens, RoleUser.par)
  @ApiOperation({ summary: 'Récupérer les absences' })
  @ApiQuery({ name: 'eleveId', required: false, description: 'Filtrer par élève' })
  @ApiQuery({ name: 'date', required: false, description: 'Filtrer par date (YYYY-MM-DD)' })
  @ApiResponse({ status: 403, description: 'Interdit - Rôle insuffisant' })
  findAll(
    @Query('eleveId') eleveId?: string,
    @Query('date') date?: string,
  ) {
    return this.absenceService.findAll(
      eleveId ? +eleveId : undefined,
      date ? new Date(date) : undefined,
    );
  }

  @Delete(':id')
  @Roles(RoleUser.adm, RoleUser.dir)
  @ApiOperation({ summary: 'Supprimer une absence' })
  @ApiResponse({ status: 403, description: 'Interdit - Rôle insuffisant' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.absenceService.remove(id);
  }
}
