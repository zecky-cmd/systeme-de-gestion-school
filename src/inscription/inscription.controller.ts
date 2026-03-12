import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { InscriptionService } from './inscription.service';
import { CreateInscriptionDto } from './dto/create-inscription.dto';
import { UpdateInscriptionDto } from './dto/update-inscription.dto';

@ApiTags('Inscriptions')
@Controller('inscription')
export class InscriptionController {
  constructor(private readonly inscriptionService: InscriptionService) {}

  @Post()
  @ApiOperation({ summary: 'Inscrire un élève dans une classe' })
  @ApiResponse({ status: 201, description: 'L\'inscription a été créée avec succès' })
  create(@Body() dto: CreateInscriptionDto) {
    return this.inscriptionService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer toutes les inscriptions' })
  @ApiQuery({ name: 'anneeId', required: false, description: 'Filtrer par année scolaire' })
  @ApiQuery({ name: 'classeId', required: false, description: 'Filtrer par classe' })
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
  @ApiOperation({ summary: 'Récupérer une inscription par son ID' })
  @ApiResponse({ status: 200, description: 'Détails de l\'inscription' })
  @ApiResponse({ status: 404, description: 'Inscription non trouvée' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.inscriptionService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Modifier une inscription' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateInscriptionDto) {
    return this.inscriptionService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer une inscription' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.inscriptionService.remove(id);
  }
}
