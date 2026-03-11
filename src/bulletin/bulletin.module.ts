import { Module } from '@nestjs/common';
import { BulletinService } from './bulletin.service';
import { BulletinController } from './bulletin.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [BulletinService],
  controllers: [BulletinController],
  exports: [BulletinService],
})
export class BulletinModule {}
