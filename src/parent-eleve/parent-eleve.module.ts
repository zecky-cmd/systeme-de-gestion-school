import { Module } from '@nestjs/common';
import { ParentEleveService } from './parent-eleve.service';
import { ParentEleveController } from './parent-eleve.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [ParentEleveService],
  controllers: [ParentEleveController],
  exports: [ParentEleveService],
})
export class ParentEleveModule {}
