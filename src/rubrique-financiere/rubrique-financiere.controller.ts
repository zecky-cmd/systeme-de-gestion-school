import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { RubriqueFinanciereService } from './rubrique-financiere.service';
import { CreateRubriqueFinanciereDto } from './dto/create-rubrique-financiere.dto';
import { UpdateRubriqueFinanciereDto } from './dto/update-rubrique-financiere.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { RoleUser } from '../users/entities/user.entity';

@ApiTags('Rubriques Financières')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('rubrique-financiere')
export class RubriqueFinanciereController {
  constructor(private readonly rubriqueService: RubriqueFinanciereService) {}

  @Post()
  @Roles(RoleUser.adm, RoleUser.dir)
  @ApiOperation({ summary: 'Créer une nouvelle rubrique financière' })
  @ApiResponse({ status: 201, description: 'Rubrique créée avec succès' })
  @ApiResponse({ status: 403, description: 'Interdit - Rôle insuffisant' })
  create(@Body() dto: CreateRubriqueFinanciereDto) {
    return this.rubriqueService.create(dto);
  }

  @Get()
  @Roles(RoleUser.adm, RoleUser.dir)
  @ApiOperation({ summary: 'Récupérer toutes les rubriques financières' })
  @ApiQuery({ name: 'anneeId', required: false, description: 'ID de l\'année scolaire' })
  @ApiResponse({ status: 200, description: 'Liste des rubriques' })
  @ApiResponse({ status: 403, description: 'Interdit - Rôle insuffisant' })
  findAll(@Query('anneeId') anneeId?: string) {
    return this.rubriqueService.findAll(anneeId ? +anneeId : undefined);
  }

  @Get(':id')
  @Roles(RoleUser.adm, RoleUser.dir)
  @ApiOperation({ summary: 'Récupérer une rubrique par son ID' })
  @ApiResponse({ status: 200, description: 'Détails de la rubrique' })
  @ApiResponse({ status: 404, description: 'Rubrique non trouvée' })
  @ApiResponse({ status: 403, description: 'Interdit - Rôle insuffisant' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.rubriqueService.findOne(id);
  }

  @Patch(':id')
  @Roles(RoleUser.adm, RoleUser.dir)
  @ApiOperation({ summary: 'Modifier une rubrique financière' })
  @ApiResponse({ status: 403, description: 'Interdit - Rôle insuffisant' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateRubriqueFinanciereDto) {
    return this.rubriqueService.update(id, dto);
  }

  @Delete(':id')
  @Roles(RoleUser.adm, RoleUser.dir)
  @ApiOperation({ summary: 'Supprimer une rubrique financière' })
  @ApiResponse({ status: 403, description: 'Interdit - Rôle insuffisant' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.rubriqueService.remove(id);
  }
}
