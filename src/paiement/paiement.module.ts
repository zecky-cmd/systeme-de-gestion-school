import { Module } from '@nestjs/common';
import { PaiementService } from './paiement.service';
import { PaiementController } from './paiement.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [PaiementService],
  controllers: [PaiementController],
  exports: [PaiementService],
})
export class PaiementModule {}
