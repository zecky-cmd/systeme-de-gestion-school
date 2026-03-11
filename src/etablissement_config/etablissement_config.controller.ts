import { Controller, Get, Post, Body, Patch, Param, ParseIntPipe, Put } from '@nestjs/common';
import { EtablissementConfigService } from './etablissement_config.service';
import { CreateEtablissementConfigDto } from './dto/create-etablissement_config.dto';
import { UpdateEtablissementConfigDto } from './dto/update-etablissement_config.dto';

@Controller('etablissement-config')
export class EtablissementConfigController {
  constructor(private readonly configService: EtablissementConfigService) {}

  @Get()
  getConfig() {
    return this.configService.getConfig();
  }

  @Post()
  createOrUpdate(@Body() dto: CreateEtablissementConfigDto) {
    return this.configService.createOrUpdate(dto);
  }

  @Patch()
  update(@Body() dto: UpdateEtablissementConfigDto) {
    return this.configService.createOrUpdate(dto);
  }

  @Put('annee-active/:id')
  setAnneeActive(@Param('id', ParseIntPipe) id: number) {
    return this.configService.setAnneeActive(id);
  }
}
