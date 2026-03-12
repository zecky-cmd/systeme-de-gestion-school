import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { MatiereService } from './matiere.service';
import { CreateMatiereDto } from './dto/create-matiere.dto';
import { UpdateMatiereDto } from './dto/update-matiere.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { RoleUser } from '../users/entities/user.entity';

@ApiTags('Matières')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('matiere')
export class MatiereController {
  constructor(private readonly matiereService: MatiereService) {}

  @Post()
  @Roles(RoleUser.adm, RoleUser.dir)
  @ApiOperation({ summary: 'Créer une nouvelle matière' })
  @ApiResponse({ status: 201, description: 'Matière créée avec succès' })
  @ApiResponse({ status: 403, description: 'Interdit - Rôle insuffisant' })
  create(@Body() createMatiereDto: CreateMatiereDto) {
    return this.matiereService.create(createMatiereDto);
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer toutes les matières' })
  findAll() {
    return this.matiereService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer une matière par son ID' })
  @ApiResponse({ status: 200, description: 'Détails de la matière' })
  @ApiResponse({ status: 404, description: 'Matière non trouvée' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.matiereService.findOne(id);
  }

  @Patch(':id')
  @Roles(RoleUser.adm, RoleUser.dir)
  @ApiOperation({ summary: 'Modifier une matière' })
  @ApiResponse({ status: 403, description: 'Interdit - Rôle insuffisant' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateMatiereDto: UpdateMatiereDto) {
    return this.matiereService.update(id, updateMatiereDto);
  }

  @Delete(':id')
  @Roles(RoleUser.adm, RoleUser.dir)
  @ApiOperation({ summary: 'Supprimer une matière' })
  @ApiResponse({ status: 403, description: 'Interdit - Rôle insuffisant' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.matiereService.remove(id);
  }
}
