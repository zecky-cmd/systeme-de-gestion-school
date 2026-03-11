import { Module } from '@nestjs/common';
import { MatiereNiveauService } from './matiere-niveau.service';
import { MatiereNiveauController } from './matiere-niveau.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [MatiereNiveauService],
  controllers: [MatiereNiveauController],
  exports: [MatiereNiveauService],
})
export class MatiereNiveauModule {}
