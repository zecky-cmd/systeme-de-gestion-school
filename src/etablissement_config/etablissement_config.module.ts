import { Module } from '@nestjs/common';
import { EtablissementConfigController } from './etablissement_config.controller';

@Module({
  controllers: [EtablissementConfigController]
})
export class EtablissementConfigModule {}
