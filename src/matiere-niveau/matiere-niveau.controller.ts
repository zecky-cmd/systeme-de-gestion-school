import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { MatiereNiveauService } from './matiere-niveau.service';
import { CreateMatiereNiveauDto } from './dto/create-matiere-niveau.dto';
import { UpdateMatiereNiveauDto } from './dto/update-matiere-niveau.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { RoleUser } from '../users/entities/user.entity';

@ApiTags('Affectations Matière-Classe')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('matiere-niveau')
export class MatiereNiveauController {
  constructor(private readonly matiereNiveauService: MatiereNiveauService) {}

  @Post()
  @Roles(RoleUser.adm, RoleUser.dir)
  @ApiOperation({ summary: 'Affecter une matière à une classe' })
  @ApiResponse({ status: 201, description: 'L\'affectation a été créée avec succès' })
  @ApiResponse({ status: 403, description: 'Interdit - Rôle insuffisant' })
  create(@Body() dto: CreateMatiereNiveauDto) {
    return this.matiereNiveauService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer toutes les affectations' })
  @ApiQuery({ name: 'classeId', required: false, description: 'Filtrer par classe' })
  findAll(@Query('classeId') classeId?: string) {
    return this.matiereNiveauService.findAll(classeId ? +classeId : undefined);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer une affectation par son ID' })
  @ApiResponse({ status: 200, description: 'Détails de l\'affectation' })
  @ApiResponse({ status: 404, description: 'Affectation non trouvée' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.matiereNiveauService.findOne(id);
  }

  @Patch(':id')
  @Roles(RoleUser.adm, RoleUser.dir)
  @ApiOperation({ summary: 'Modifier une affectation' })
  @ApiResponse({ status: 403, description: 'Interdit - Rôle insuffisant' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateMatiereNiveauDto) {
    return this.matiereNiveauService.update(id, dto);
  }

  @Delete(':id')
  @Roles(RoleUser.adm, RoleUser.dir)
  @ApiOperation({ summary: 'Supprimer une affectation' })
  @ApiResponse({ status: 403, description: 'Interdit - Rôle insuffisant' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.matiereNiveauService.remove(id);
  }
}
