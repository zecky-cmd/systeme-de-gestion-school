import { Module } from '@nestjs/common';
import { CreneauService } from './creneau.service';
import { CreneauController } from './creneau.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [CreneauService],
  controllers: [CreneauController],
  exports: [CreneauService],
})
export class CreneauModule {}
