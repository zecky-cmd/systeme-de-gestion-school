import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { AnneeScolaireService } from './annee-scolaire.service';
import { CreateAnneeScolaireDto } from './dto/create-annee-scolaire.dto';
import { UpdateAnneeScolaireDto } from './dto/update-annee-scolaire.dto';

@Controller('annee-scolaire')
export class AnneeScolaireController {
  constructor(private readonly anneeScolaireService: AnneeScolaireService) {}

  @Post()
  create(@Body() createAnneeScolaireDto: CreateAnneeScolaireDto) {
    return this.anneeScolaireService.create(createAnneeScolaireDto);
  }

  @Get()
  findAll() {
    return this.anneeScolaireService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.anneeScolaireService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateAnneeScolaireDto: UpdateAnneeScolaireDto) {
    return this.anneeScolaireService.update(id, updateAnneeScolaireDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.anneeScolaireService.remove(id);
  }
}
