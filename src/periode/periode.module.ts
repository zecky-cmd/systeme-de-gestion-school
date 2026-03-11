import { Module } from '@nestjs/common';
import { PeriodeService } from './periode.service';
import { PeriodeController } from './periode.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [PeriodeService],
  controllers: [PeriodeController],
  exports: [PeriodeService],
})
export class PeriodeModule {}
