import { Module } from '@nestjs/common';
import { AnneeScolaireController } from './annee-scolaire.controller';
import { AnneeScolaireService } from './annee-scolaire.service';

@Module({
  controllers: [AnneeScolaireController],
  providers: [AnneeScolaireService]
})
export class AnneeScolaireModule {}
