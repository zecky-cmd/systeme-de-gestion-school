import { Module } from '@nestjs/common';
import { EtablissementConfigService } from './etablissement_config.service';
import { EtablissementConfigController } from './etablissement_config.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [EtablissementConfigService],
  controllers: [EtablissementConfigController],
  exports: [EtablissementConfigService],
})
export class EtablissementConfigModule {}
