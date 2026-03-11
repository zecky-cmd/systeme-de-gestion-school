import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe, Patch } from '@nestjs/common';
import { BulletinService } from './bulletin.service';
import { CreateBulletinDto } from './dto/create-bulletin.dto';

@Controller('bulletin')
export class BulletinController {
  constructor(private readonly bulletinService: BulletinService) {}

  @Post()
  create(@Body() dto: CreateBulletinDto) {
    return this.bulletinService.create(dto);
  }

  @Get('eleve/:id')
  findByEleve(@Param('id', ParseIntPipe) id: number) {
    return this.bulletinService.findByEleve(id);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.bulletinService.findOne(id);
  }

  @Patch(':id/publish')
  publish(@Param('id', ParseIntPipe) id: number) {
    return this.bulletinService.publish(id);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.bulletinService.remove(id);
  }
}
