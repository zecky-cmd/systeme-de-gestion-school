import { Module } from '@nestjs/common';
import { MatiereService } from './matiere.service';

@Module({
  providers: [MatiereService]
})
export class MatiereModule {}
