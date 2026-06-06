import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe, Patch, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { BulletinService } from './bulletin.service';
import { CreateBulletinDto } from './dto/create-bulletin.dto';
import { CalculClasseDto } from './dto/calcul-classe.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { RoleUser } from '../users/entities/user.entity';

@ApiTags('Bulletins')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('bulletin')
export class BulletinController {
  constructor(private readonly bulletinService: BulletinService) {}

  @Get('stats/globales')
  @Roles(RoleUser.adm, RoleUser.dir)
  @ApiOperation({ summary: 'Récupérer les statistiques globales des bulletins' })
  @ApiQuery({ name: 'periodeId', required: false, description: 'ID de la période' })
  getGlobalStats(@Query('periodeId') periodeId?: string) {
    return this.bulletinService.getGlobalStats(periodeId ? +periodeId : undefined);
  }

  @Get('stats/classes')
  @Roles(RoleUser.adm, RoleUser.dir)
  @ApiOperation({ summary: 'Récupérer l\'état d\'avancement des bulletins par classe' })
  @ApiQuery({ name: 'periodeId', required: true, description: 'ID de la période' })
  getClassStats(@Query('periodeId', ParseIntPipe) periodeId: number) {
    return this.bulletinService.getClassStats(periodeId);
  }

  @Get('classe/:classeId')
  @Roles(RoleUser.adm, RoleUser.dir, RoleUser.par, RoleUser.elv)
  @ApiOperation({ summary: 'Récupérer la liste des bulletins d\'une classe' })
  @ApiQuery({ name: 'periodeId', required: true, description: 'ID de la période' })
  getBulletinsByClasse(
    @Param('classeId', ParseIntPipe) classeId: number,
    @Query('periodeId', ParseIntPipe) periodeId: number,
  ) {
    return this.bulletinService.getBulletinsByClasse(classeId, periodeId);
  }

  @Post()
  @Roles(RoleUser.adm, RoleUser.dir)
  @ApiOperation({ summary: 'Générer un bulletin scolaire (Manuel)' })
  @ApiResponse({ status: 201, description: 'Le bulletin a été généré avec succès' })
  @ApiResponse({ status: 403, description: 'Interdit - Rôle insuffisant' })
  create(@Body() dto: CreateBulletinDto) {
    return this.bulletinService.create(dto);
  }

  @Post('generate-eleve/:eleveId/:periodeId')
  @Roles(RoleUser.adm, RoleUser.dir)
  @ApiOperation({ summary: 'Calculer la moyenne d\'un élève' })
  async generateForEleve(
    @Param('eleveId', ParseIntPipe) eleveId: number,
    @Param('periodeId', ParseIntPipe) periodeId: number,
    @Body('userId', ParseIntPipe) userId: number, // ID de l'admin qui valide
  ) {
    return this.bulletinService.calculerResultats(eleveId, periodeId, userId);
  }

  @Post('rank-classe/:classeId/:periodeId')
  @Roles(RoleUser.adm, RoleUser.dir)
  @ApiOperation({ summary: 'Calculer les rangs d\'une classe' })
  async rankClasse(
    @Param('classeId', ParseIntPipe) classeId: number,
    @Param('periodeId', ParseIntPipe) periodeId: number,
  ) {
    return this.bulletinService.attribuerRangs(classeId, periodeId);
  }

  @Post('calculer-classe')
  @Roles(RoleUser.adm, RoleUser.dir)
  @ApiOperation({ summary: 'Tout calculer pour une classe (Moyennes + Rangs)' })
  async calculerClasse(@Body() dto: CalculClasseDto) {
    return this.bulletinService.calculerClasseResultats(dto);
  }

  @Get('eleve/:id')
  @Roles(RoleUser.adm, RoleUser.dir, RoleUser.par, RoleUser.elv)
  @ApiOperation({ summary: 'Récupérer les bulletins d\'un élève' })
  @ApiResponse({ status: 403, description: 'Interdit - Rôle insuffisant' })
  findByEleve(@Param('id', ParseIntPipe) id: number) {
    return this.bulletinService.findByEleve(id);
  }

  @Get(':id')
  @Roles(RoleUser.adm, RoleUser.dir, RoleUser.par, RoleUser.elv)
  @ApiOperation({ summary: 'Récupérer un bulletin détaillé' })
  @ApiResponse({ status: 200, description: 'Détails du bulletin' })
  @ApiResponse({ status: 403, description: 'Interdit - Rôle insuffisant' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.bulletinService.findOne(id);
  }

  @Patch(':id/publish')
  @Roles(RoleUser.adm, RoleUser.dir)
  @ApiOperation({ summary: 'Publier un bulletin (le rendre visible aux parents/élèves)' })
  @ApiResponse({ status: 403, description: 'Interdit - Rôle insuffisant' })
  publish(@Param('id', ParseIntPipe) id: number) {
    return this.bulletinService.publish(id);
  }

  @Delete(':id')
  @Roles(RoleUser.adm, RoleUser.dir)
  @ApiOperation({ summary: 'Supprimer un bulletin' })
  @ApiResponse({ status: 403, description: 'Interdit - Rôle insuffisant' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.bulletinService.remove(id);
  }
}
