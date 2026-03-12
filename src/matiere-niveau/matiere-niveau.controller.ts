import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { MatiereNiveauService } from './matiere-niveau.service';
import { CreateMatiereNiveauDto } from './dto/create-matiere-niveau.dto';
import { UpdateMatiereNiveauDto } from './dto/update-matiere-niveau.dto';

@ApiTags('Affectations Matière-Classe')
@Controller('matiere-niveau')
export class MatiereNiveauController {
  constructor(private readonly matiereNiveauService: MatiereNiveauService) {}

  @Post()
  @ApiOperation({ summary: 'Affecter une matière à une classe' })
  @ApiResponse({ status: 201, description: 'L\'affectation a été créée avec succès' })
  create(@Body() dto: CreateMatiereNiveauDto) {
    return this.matiereNiveauService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer toutes les affectations' })
  @ApiQuery({ name: 'classeId', required: false, description: 'Filtrer par classe' })
  findAll(@Query('classeId') classeId?: string) {
    return this.matiereNiveauService.findAll(classeId ? +classeId : undefined);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer une affectation par son ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.matiereNiveauService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Modifier une affectation' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateMatiereNiveauDto) {
    return this.matiereNiveauService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer une affectation' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.matiereNiveauService.remove(id);
  }
}
