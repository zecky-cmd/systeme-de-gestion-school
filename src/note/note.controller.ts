import { Controller, Get, Post, Body, Param, ParseIntPipe, Query } from '@nestjs/common';
import { NoteService } from './note.service';
import { CreateNoteDto } from './dto/create-note.dto';

@Controller('note')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Post()
  upsert(@Body() dto: CreateNoteDto) {
    return this.noteService.upsert(dto);
  }

  @Get('evaluation/:id')
  findByEvaluation(@Param('id', ParseIntPipe) id: number) {
    return this.noteService.findByEvaluation(id);
  }

  @Get('eleve/:id')
  findByEleve(
    @Param('id', ParseIntPipe) id: number,
    @Query('periodeId') periodeId?: string,
  ) {
    return this.noteService.findByEleve(id, periodeId ? +periodeId : undefined);
  }
}
