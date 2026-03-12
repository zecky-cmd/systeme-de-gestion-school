import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { CreneauService } from './creneau.service';
import { CreateCreneauDto } from './dto/create-creneau.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { RoleUser } from '../users/entities/user.entity';

@ApiTags('Emploi du Temps / Créneaux')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('creneau')
export class CreneauController {
  constructor(private readonly creneauService: CreneauService) {}

  @Post()
  @Roles(RoleUser.adm, RoleUser.dir)
  @ApiOperation({ summary: 'Créer un nouveau créneau d\'emploi du temps' })
  @ApiResponse({ status: 201, description: 'Créneau créé avec succès' })
  @ApiResponse({ status: 403, description: 'Interdit - Rôle insuffisant' })
  create(@Body() dto: CreateCreneauDto) {
    return this.creneauService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer l\'emploi du temps' })
  @ApiQuery({ name: 'classeId', required: false, description: 'Filtrer par classe' })
  findAll(@Query('classeId') classeId?: string) {
    return this.creneauService.findAll(classeId ? +classeId : undefined);
  }

  @Delete(':id')
  @Roles(RoleUser.adm, RoleUser.dir)
  @ApiOperation({ summary: 'Supprimer un créneau' })
  @ApiResponse({ status: 403, description: 'Interdit - Rôle insuffisant' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.creneauService.remove(id);
  }
}
