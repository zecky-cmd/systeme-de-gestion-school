import { Module } from '@nestjs/common';
import { EnseignantService } from './enseignant.service';
import { EnseignantController } from './enseignant.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [EnseignantService],
  controllers: [EnseignantController],
  exports: [EnseignantService],
})
export class EnseignantModule {}
