import { Module } from '@nestjs/common';
import { AnneeScolaireController } from './annee-scolaire.controller';
import { AnneeScolaireService } from './annee-scolaire.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [AnneeScolaireController],
  providers: [AnneeScolaireService],
  exports: [AnneeScolaireService],
})
export class AnneeScolaireModule {}
