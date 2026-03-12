import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ParentEleveService } from './parent-eleve.service';
import { CreateParentEleveDto } from './dto/create-parent-eleve.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { RoleUser } from '../users/entities/user.entity';

@ApiTags('Relations Parent-Élève')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('parent-eleve')
export class ParentEleveController {
  constructor(private readonly parentEleveService: ParentEleveService) {}

  @Post()
  @Roles(RoleUser.adm, RoleUser.dir)
  @ApiOperation({ summary: 'Lier un parent à un élève' })
  @ApiResponse({ status: 201, description: 'Lien créé avec succès' })
  @ApiResponse({ status: 403, description: 'Interdit - Rôle insuffisant' })
  create(@Body() dto: CreateParentEleveDto) {
    return this.parentEleveService.create(dto);
  }

  @Get()
  @Roles(RoleUser.adm, RoleUser.dir)
  @ApiOperation({ summary: 'Récupérer tous les liens parent-élève' })
  @ApiResponse({ status: 403, description: 'Interdit - Rôle insuffisant' })
  findAll() {
    return this.parentEleveService.findAll();
  }

  @Delete(':parentId/:eleveId')
  @Roles(RoleUser.adm, RoleUser.dir)
  @ApiOperation({ summary: 'Supprimer un lien parent-élève' })
  @ApiResponse({ status: 403, description: 'Interdit - Rôle insuffisant' })
  remove(
    @Param('parentId', ParseIntPipe) parentId: number,
    @Param('eleveId', ParseIntPipe) eleveId: number,
  ) {
    return this.parentEleveService.remove(parentId, eleveId);
  }
}
