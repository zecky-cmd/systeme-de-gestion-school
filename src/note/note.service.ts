import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateNoteDto } from './dto/create-note.dto';

@Injectable()
export class NoteService {
  constructor(private readonly databaseService: DatabaseService) {}

  async upsert(dto: CreateNoteDto) {
    // Vérifier si l'évaluation existe
    const evalObj = await this.databaseService.evaluation.findUnique({ where: { id: dto.evaluationId } });
    if (!evalObj) throw new NotFoundException(`Évaluation ${dto.evaluationId} non trouvée`);

    // Vérifier si l'élève existe
    const eleve = await this.databaseService.eleve.findUnique({ where: { id: dto.eleveId } });
    if (!eleve) throw new NotFoundException(`Élève ${dto.eleveId} non trouvé`);

    return this.databaseService.note.upsert({
      where: {
        eleveId_evaluationId: {
          eleveId: dto.eleveId,
          evaluationId: dto.evaluationId,
        },
      },
      update: {
        valeur: dto.valeur,
        estAbsent: dto.estAbsent,
        appreciation: dto.appreciation,
      },
      create: dto as any,
    });
  }

  async findByEvaluation(evaluationId: number) {
    return this.databaseService.note.findMany({
      where: { evaluationId },
      include: { eleve: { include: { user: true } } },
    });
  }

  async findByEleve(eleveId: number, periodeId?: number) {
    return this.databaseService.note.findMany({
      where: {
        eleveId,
        evaluation: periodeId ? { periodeId } : {},
      },
      include: {
        evaluation: {
          include: {
            matiereNiveau: { include: { matiere: true } },
            periode: true,
          },
        },
      },
    });
  }
}
