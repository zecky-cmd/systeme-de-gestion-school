import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { ClasseService } from './classe.service';
import { CreateClasseDto } from './dto/create-classe.dto';
import { UpdateClasseDto } from './dto/update-classe.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { RoleUser } from '../users/entities/user.entity';

@ApiTags('Classes')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('classe')
export class ClasseController {
  constructor(private readonly classeService: ClasseService) {}

  @Post()
  @Roles(RoleUser.adm, RoleUser.dir)
  @ApiOperation({ summary: 'Créer une nouvelle classe' })
  @ApiResponse({ status: 201, description: 'Classe créée avec succès' })
  @ApiResponse({ status: 403, description: 'Interdit - Rôle insuffisant' })
  create(@Body() createClasseDto: CreateClasseDto) {
    return this.classeService.create(createClasseDto);
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer toutes les classes' })
  @ApiQuery({ name: 'anneeId', required: false, description: 'Filtrer par année scolaire' })
  findAll(@Query('anneeId') anneeId?: string) {
    return this.classeService.findAll(anneeId ? +anneeId : undefined);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer une classe par son ID' })
  @ApiResponse({ status: 200, description: 'Détails de la classe' })
  @ApiResponse({ status: 404, description: 'Classe non trouvée' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.classeService.findOne(id);
  }

  @Patch(':id')
  @Roles(RoleUser.adm, RoleUser.dir)
  @ApiOperation({ summary: 'Modifier une classe' })
  @ApiResponse({ status: 403, description: 'Interdit - Rôle insuffisant' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateClasseDto: UpdateClasseDto) {
    return this.classeService.update(id, updateClasseDto);
  }

  @Delete(':id')
  @Roles(RoleUser.adm, RoleUser.dir)
  @ApiOperation({ summary: 'Supprimer une classe' })
  @ApiResponse({ status: 403, description: 'Interdit - Rôle insuffisant' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.classeService.remove(id);
  }
}
