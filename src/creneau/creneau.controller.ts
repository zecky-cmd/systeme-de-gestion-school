import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { CreneauService } from './creneau.service';
import { CreateCreneauDto } from './dto/create-creneau.dto';

@Controller('creneau')
export class CreneauController {
  constructor(private readonly creneauService: CreneauService) {}

  @Post()
  create(@Body() dto: CreateCreneauDto) {
    return this.creneauService.create(dto);
  }

  @Get()
  findAll(@Query('classeId') classeId?: string) {
    return this.creneauService.findAll(classeId ? +classeId : undefined);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.creneauService.remove(id);
  }
}
