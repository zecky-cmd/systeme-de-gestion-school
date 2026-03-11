import { Module } from '@nestjs/common';
import { EleveService } from './eleve.service';
import { EleveController } from './eleve.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [EleveService],
  controllers: [EleveController],
  exports: [EleveService],
})
export class EleveModule {}
