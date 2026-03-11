import { Module } from '@nestjs/common';
import { ClasseController } from './classe.controller';
import { ClasseService } from './classe.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ClasseController],
  providers: [ClasseService],
  exports: [ClasseService],
})
export class ClasseModule {}
