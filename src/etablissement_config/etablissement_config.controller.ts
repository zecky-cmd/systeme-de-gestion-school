import { Controller, Get, Post, Body, Patch, Param, ParseIntPipe, Put, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { EtablissementConfigService } from './etablissement_config.service';
import { CreateEtablissementConfigDto } from './dto/create-etablissement_config.dto';
import { UpdateEtablissementConfigDto } from './dto/update-etablissement_config.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { RoleUser } from '../users/entities/user.entity';

@ApiTags('Configuration Établissement')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('etablissement-config')
export class EtablissementConfigController {
  constructor(private readonly configService: EtablissementConfigService) {}

  @Get()
  @ApiOperation({ summary: 'Récupérer la configuration de l\'établissement' })
  @ApiResponse({ status: 200, description: 'Configuration actuelle' })
  getConfig() {
    return this.configService.getConfig();
  }

  @Post()
  @Roles(RoleUser.adm, RoleUser.dir)
  @ApiOperation({ summary: 'Créer ou mettre à jour la configuration complète' })
  @ApiResponse({ status: 200, description: 'Configuration enregistrée' })
  @ApiResponse({ status: 403, description: 'Interdit - Rôle insuffisant' })
  createOrUpdate(@Body() dto: CreateEtablissementConfigDto) {
    return this.configService.createOrUpdate(dto);
  }

  @Patch()
  @Roles(RoleUser.adm, RoleUser.dir)
  @ApiOperation({ summary: 'Mise à jour partielle de la configuration' })
  @ApiResponse({ status: 403, description: 'Interdit - Rôle insuffisant' })
  update(@Body() dto: UpdateEtablissementConfigDto) {
    return this.configService.createOrUpdate(dto);
  }

  @Put('annee-active/:id')
  @Roles(RoleUser.adm, RoleUser.dir)
  @ApiOperation({ summary: 'Définir l\'année scolaire active par défaut' })
  @ApiResponse({ status: 200, description: 'Année active mise à jour' })
  @ApiResponse({ status: 403, description: 'Interdit - Rôle insuffisant' })
  setAnneeActive(@Param('id', ParseIntPipe) id: number) {
    return this.configService.setAnneeActive(id);
  }
}
