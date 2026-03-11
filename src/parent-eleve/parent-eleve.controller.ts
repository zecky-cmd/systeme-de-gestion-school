import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ParentEleveService } from './parent-eleve.service';
import { CreateParentEleveDto } from './dto/create-parent-eleve.dto';

@Controller('parent-eleve')
export class ParentEleveController {
  constructor(private readonly parentEleveService: ParentEleveService) {}

  @Post()
  create(@Body() dto: CreateParentEleveDto) {
    return this.parentEleveService.create(dto);
  }

  @Get()
  findAll() {
    return this.parentEleveService.findAll();
  }

  @Delete(':parentId/:eleveId')
  remove(
    @Param('parentId', ParseIntPipe) parentId: number,
    @Param('eleveId', ParseIntPipe) eleveId: number,
  ) {
    return this.parentEleveService.remove(parentId, eleveId);
  }
}
