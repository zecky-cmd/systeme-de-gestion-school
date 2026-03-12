import { Controller, Get, Post, Body, Param, ParseIntPipe, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { NoteService } from './note.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { RoleUser } from '../users/entities/user.entity';

@ApiTags('Notes')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('note')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Post()
  @Roles(RoleUser.adm, RoleUser.dir, RoleUser.ens)
  @ApiOperation({ summary: 'Enregistrer ou mettre à jour une note' })
  @ApiResponse({ status: 200, description: 'Note enregistrée' })
  @ApiResponse({ status: 403, description: 'Interdit - Rôle insuffisant' })
  upsert(@Body() dto: CreateNoteDto) {
    return this.noteService.upsert(dto);
  }

  @Get('evaluation/:id')
  @Roles(RoleUser.adm, RoleUser.dir, RoleUser.ens)
  @ApiOperation({ summary: 'Récupérer les notes d\'une évaluation' })
  @ApiResponse({ status: 403, description: 'Interdit - Rôle insuffisant' })
  findByEvaluation(@Param('id', ParseIntPipe) id: number) {
    return this.noteService.findByEvaluation(id);
  }

  @Get('eleve/:id')
  @Roles(RoleUser.adm, RoleUser.dir, RoleUser.ens, RoleUser.par, RoleUser.elv)
  @ApiOperation({ summary: 'Récupérer les notes d\'un élève' })
  @ApiQuery({ name: 'periodeId', required: false, description: 'ID de la période' })
  @ApiResponse({ status: 403, description: 'Interdit - Rôle insuffisant' })
  findByEleve(
    @Param('id', ParseIntPipe) id: number,
    @Query('periodeId') periodeId?: string,
  ) {
    return this.noteService.findByEleve(id, periodeId ? +periodeId : undefined);
  }
}
