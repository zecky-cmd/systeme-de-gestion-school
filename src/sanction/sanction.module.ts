import { Module } from '@nestjs/common';
import { SanctionService } from './sanction.service';
import { SanctionController } from './sanction.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [SanctionService],
  controllers: [SanctionController],
  exports: [SanctionService],
})
export class SanctionModule {}
