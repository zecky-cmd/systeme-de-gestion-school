import { Module } from '@nestjs/common';
import { RubriqueFinanciereService } from './rubrique-financiere.service';
import { RubriqueFinanciereController } from './rubrique-financiere.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [RubriqueFinanciereService],
  controllers: [RubriqueFinanciereController],
  exports: [RubriqueFinanciereService],
})
export class RubriqueFinanciereModule {}
