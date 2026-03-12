import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ParentService } from './parent.service';
import { CreateParentDto } from './dto/create-parent.dto';
import { UpdateParentDto } from './dto/update-parent.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { RoleUser } from '../users/entities/user.entity';

@ApiTags('Parents')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('parent')
export class ParentController {
  constructor(private readonly parentService: ParentService) {}

  @Post()
  @Roles(RoleUser.adm, RoleUser.dir)
  @ApiOperation({ summary: 'Créer un profil parent' })
  @ApiResponse({ status: 201, description: 'Le parent a été créé avec succès' })
  @ApiResponse({ status: 403, description: 'Interdit - Rôle insuffisant' })
  create(@Body() dto: CreateParentDto) {
    return this.parentService.create(dto);
  }

  @Get()
  @Roles(RoleUser.adm, RoleUser.dir)
  @ApiOperation({ summary: 'Récupérer tous les parents' })
  @ApiResponse({ status: 403, description: 'Interdit - Rôle insuffisant' })
  findAll() {
    return this.parentService.findAll();
  }

  @Get(':id')
  @Roles(RoleUser.adm, RoleUser.dir)
  @ApiOperation({ summary: 'Récupérer un parent par son ID' })
  @ApiResponse({ status: 200, description: 'Détails du parent' })
  @ApiResponse({ status: 404, description: 'Parent non trouvé' })
  @ApiResponse({ status: 403, description: 'Interdit - Rôle insuffisant' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.parentService.findOne(id);
  }

  @Patch(':id')
  @Roles(RoleUser.adm, RoleUser.dir)
  @ApiOperation({ summary: 'Mettre à jour un profil parent' })
  @ApiResponse({ status: 403, description: 'Interdit - Rôle insuffisant' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateParentDto) {
    return this.parentService.update(id, dto);
  }

  @Delete(':id')
  @Roles(RoleUser.adm, RoleUser.dir)
  @ApiOperation({ summary: 'Supprimer un profil parent' })
  @ApiResponse({ status: 403, description: 'Interdit - Rôle insuffisant' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.parentService.remove(id);
  }
}
