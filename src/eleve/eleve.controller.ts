import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { EleveService } from './eleve.service';
import { CreateEleveDto } from './dto/create-eleve.dto';
import { UpdateEleveDto } from './dto/update-eleve.dto';

@Controller('eleve')
export class EleveController {
  constructor(private readonly eleveService: EleveService) {}

  @Post()
  create(@Body() dto: CreateEleveDto) {
    return this.eleveService.create(dto);
  }

  @Get()
  findAll() {
    return this.eleveService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.eleveService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateEleveDto) {
    return this.eleveService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.eleveService.remove(id);
  }
}
