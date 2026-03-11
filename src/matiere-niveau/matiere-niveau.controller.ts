import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { MatiereNiveauService } from './matiere-niveau.service';
import { CreateMatiereNiveauDto } from './dto/create-matiere-niveau.dto';
import { UpdateMatiereNiveauDto } from './dto/update-matiere-niveau.dto';

@Controller('matiere-niveau')
export class MatiereNiveauController {
  constructor(private readonly matiereNiveauService: MatiereNiveauService) {}

  @Post()
  create(@Body() dto: CreateMatiereNiveauDto) {
    return this.matiereNiveauService.create(dto);
  }

  @Get()
  findAll(@Query('classeId') classeId?: string) {
    return this.matiereNiveauService.findAll(classeId ? +classeId : undefined);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.matiereNiveauService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateMatiereNiveauDto) {
    return this.matiereNiveauService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.matiereNiveauService.remove(id);
  }
}
