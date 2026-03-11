import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { InscriptionService } from './inscription.service';
import { CreateInscriptionDto } from './dto/create-inscription.dto';
import { UpdateInscriptionDto } from './dto/update-inscription.dto';

@Controller('inscription')
export class InscriptionController {
  constructor(private readonly inscriptionService: InscriptionService) {}

  @Post()
  create(@Body() dto: CreateInscriptionDto) {
    return this.inscriptionService.create(dto);
  }

  @Get()
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
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.inscriptionService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateInscriptionDto) {
    return this.inscriptionService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.inscriptionService.remove(id);
  }
}
