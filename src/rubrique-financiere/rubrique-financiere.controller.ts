import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { RubriqueFinanciereService } from './rubrique-financiere.service';
import { CreateRubriqueFinanciereDto } from './dto/create-rubrique-financiere.dto';
import { UpdateRubriqueFinanciereDto } from './dto/update-rubrique-financiere.dto';

@Controller('rubrique-financiere')
export class RubriqueFinanciereController {
  constructor(private readonly rubriqueService: RubriqueFinanciereService) {}

  @Post()
  create(@Body() dto: CreateRubriqueFinanciereDto) {
    return this.rubriqueService.create(dto);
  }

  @Get()
  findAll(@Query('anneeId') anneeId?: string) {
    return this.rubriqueService.findAll(anneeId ? +anneeId : undefined);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.rubriqueService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateRubriqueFinanciereDto) {
    return this.rubriqueService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.rubriqueService.remove(id);
  }
}
