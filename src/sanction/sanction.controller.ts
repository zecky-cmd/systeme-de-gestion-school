import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { SanctionService } from './sanction.service';
import { CreateSanctionDto } from './dto/create-sanction.dto';

@Controller('sanction')
export class SanctionController {
  constructor(private readonly sanctionService: SanctionService) {}

  @Post()
  create(@Body() dto: CreateSanctionDto) {
    return this.sanctionService.create(dto);
  }

  @Get()
  findAll(@Query('eleveId') eleveId?: string) {
    return this.sanctionService.findAll(eleveId ? +eleveId : undefined);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.sanctionService.remove(id);
  }
}
