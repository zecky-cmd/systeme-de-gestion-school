import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { InscriptionService } from './inscription.service';
import { CreateInscriptionDto } from './dto/create-inscription.dto';
import { UpdateInscriptionDto } from './dto/update-inscription.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { RoleUser } from '../users/entities/user.entity';

@ApiTags('Inscriptions')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('inscription')
export class InscriptionController {
  constructor(private readonly inscriptionService: InscriptionService) {}

  @Post()
  @Roles(RoleUser.adm, RoleUser.dir)
  @ApiOperation({ summary: 'Inscrire un élève dans une classe' })
  @ApiResponse({ status: 201, description: 'L\'inscription a été créée avec succès' })
  @ApiResponse({ status: 403, description: 'Interdit - Rôle insuffisant' })
  create(@Body() dto: CreateInscriptionDto) {
    return this.inscriptionService.create(dto);
  }

  @Get()
  @Roles(RoleUser.adm, RoleUser.dir)
  @ApiOperation({ summary: 'Récupérer toutes les inscriptions' })
  @ApiQuery({ name: 'anneeId', required: false, description: 'Filtrer par année scolaire' })
  @ApiQuery({ name: 'classeId', required: false, description: 'Filtrer par classe' })
  @ApiResponse({ status: 403, description: 'Interdit - Rôle insuffisant' })
  findAll(
    @Query('anneeId') anneeId?: string,
    @Query('classeId') classeId?: string,
  ) {
    return this.inscriptionService.findAll(
      anneeId ? +anneeId : undefined,
      classeId ? +classeId : undefined,
    );
  }

  @Get(':id')
  @Roles(RoleUser.adm, RoleUser.dir)
  @ApiOperation({ summary: 'Récupérer une inscription par son ID' })
  @ApiResponse({ status: 200, description: 'Détails de l\'inscription' })
  @ApiResponse({ status: 404, description: 'Inscription non trouvée' })
  @ApiResponse({ status: 403, description: 'Interdit - Rôle insuffisant' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.inscriptionService.findOne(id);
  }

  @Patch(':id')
  @Roles(RoleUser.adm, RoleUser.dir)
  @ApiOperation({ summary: 'Modifier une inscription' })
  @ApiResponse({ status: 403, description: 'Interdit - Rôle insuffisant' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateInscriptionDto) {
    return this.inscriptionService.update(id, dto);
  }

  @Delete(':id')
  @Roles(RoleUser.adm, RoleUser.dir)
  @ApiOperation({ summary: 'Supprimer une inscription' })
  @ApiResponse({ status: 403, description: 'Interdit - Rôle insuffisant' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.inscriptionService.remove(id);
  }
}
