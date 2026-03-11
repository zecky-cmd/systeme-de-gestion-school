import { Module } from '@nestjs/common';
import { InscriptionService } from './inscription.service';
import { InscriptionController } from './inscription.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [InscriptionService],
  controllers: [InscriptionController],
  exports: [InscriptionService],
})
export class InscriptionModule {}
