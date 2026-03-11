import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { PaiementService } from './paiement.service';
import { CreatePaiementDto } from './dto/create-paiement.dto';
import { UpdatePaiementDto } from './dto/update-paiement.dto';

@Controller('paiement')
export class PaiementController {
  constructor(private readonly paiementService: PaiementService) {}

  @Post()
  create(@Body() dto: CreatePaiementDto) {
    return this.paiementService.create(dto);
  }

  @Get()
  findAll(@Query('eleveId') eleveId?: string) {
    return this.paiementService.findAll(eleveId ? +eleveId : undefined);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.paiementService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdatePaiementDto) {
    return this.paiementService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.paiementService.remove(id);
  }
}
