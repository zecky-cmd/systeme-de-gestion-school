import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { PeriodeService } from './periode.service';
import { CreatePeriodeDto } from './dto/create-periode.dto';
import { UpdatePeriodeDto } from './dto/update-periode.dto';

@Controller('periode')
export class PeriodeController {
  constructor(private readonly periodeService: PeriodeService) {}

  @Post()
  create(@Body() dto: CreatePeriodeDto) {
    return this.periodeService.create(dto);
  }

  @Get()
  findAll(@Query('anneeId') anneeId?: string) {
    return this.periodeService.findAll(anneeId ? +anneeId : undefined);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.periodeService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdatePeriodeDto) {
    return this.periodeService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.periodeService.remove(id);
  }
}
