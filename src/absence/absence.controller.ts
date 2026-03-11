import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { AbsenceService } from './absence.service';
import { CreateAbsenceDto } from './dto/create-absence.dto';

@Controller('absence')
export class AbsenceController {
  constructor(private readonly absenceService: AbsenceService) {}

  @Post()
  create(@Body() dto: CreateAbsenceDto) {
    return this.absenceService.create(dto);
  }

  @Get()
  findAll(
    @Query('eleveId') eleveId?: string,
    @Query('date') date?: string,
  ) {
    return this.absenceService.findAll(
      eleveId ? +eleveId : undefined,
      date ? new Date(date) : undefined,
    );
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.absenceService.remove(id);
  }
}
