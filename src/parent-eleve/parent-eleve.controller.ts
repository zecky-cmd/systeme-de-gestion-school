import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ParentEleveService } from './parent-eleve.service';
import { CreateParentEleveDto } from './dto/create-parent-eleve.dto';

@ApiTags('Relations Parent-Élève')
@Controller('parent-eleve')
export class ParentEleveController {
  constructor(private readonly parentEleveService: ParentEleveService) {}

  @Post()
  @ApiOperation({ summary: 'Lier un parent à un élève' })
  @ApiResponse({ status: 201, description: 'Lien créé avec succès' })
  create(@Body() dto: CreateParentEleveDto) {
    return this.parentEleveService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer tous les liens parent-élève' })
  findAll() {
    return this.parentEleveService.findAll();
  }

  @Delete(':parentId/:eleveId')
  @ApiOperation({ summary: 'Supprimer un lien parent-élève' })
  remove(
    @Param('parentId', ParseIntPipe) parentId: number,
    @Param('eleveId', ParseIntPipe) eleveId: number,
  ) {
    return this.parentEleveService.remove(parentId, eleveId);
  }
}
