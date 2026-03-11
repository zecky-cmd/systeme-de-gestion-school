import { Module } from '@nestjs/common';
import { AbsenceService } from './absence.service';
import { AbsenceController } from './absence.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [AbsenceService],
  controllers: [AbsenceController],
  exports: [AbsenceService],
})
export class AbsenceModule {}
