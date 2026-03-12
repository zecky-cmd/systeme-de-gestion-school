import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AnneeScolaireService } from './annee-scolaire.service';
import { CreateAnneeScolaireDto } from './dto/create-annee-scolaire.dto';
import { UpdateAnneeScolaireDto } from './dto/update-annee-scolaire.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { RoleUser } from '../users/entities/user.entity';

@ApiTags('Années Scolaires')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('annee-scolaire')
export class AnneeScolaireController {
  constructor(private readonly anneeScolaireService: AnneeScolaireService) {}

  @Post()
  @Roles(RoleUser.adm, RoleUser.dir)
  @ApiOperation({ summary: 'Créer une nouvelle année scolaire' })
  @ApiResponse({ status: 201, description: 'L\'année scolaire a été créée avec succès' })
  @ApiResponse({ status: 400, description: 'Données invalides' })
  @ApiResponse({ status: 403, description: 'Interdit - Rôle insuffisant' })
  create(@Body() createAnneeScolaireDto: CreateAnneeScolaireDto) {
    return this.anneeScolaireService.create(createAnneeScolaireDto);
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer toutes les années scolaires' })
  findAll() {
    return this.anneeScolaireService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer une année scolaire par son ID' })
  @ApiResponse({ status: 200, description: 'Détails de l\'année scolaire' })
  @ApiResponse({ status: 404, description: 'Année scolaire non trouvée' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.anneeScolaireService.findOne(id);
  }

  @Patch(':id')
  @Roles(RoleUser.adm, RoleUser.dir)
  @ApiOperation({ summary: 'Mettre à jour une année scolaire' })
  @ApiResponse({ status: 403, description: 'Interdit - Rôle insuffisant' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateAnneeScolaireDto: UpdateAnneeScolaireDto) {
    return this.anneeScolaireService.update(id, updateAnneeScolaireDto);
  }

  @Delete(':id')
  @Roles(RoleUser.adm, RoleUser.dir)
  @ApiOperation({ summary: 'Supprimer une année scolaire' })
  @ApiResponse({ status: 403, description: 'Interdit - Rôle insuffisant' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.anneeScolaireService.remove(id);
  }
}
