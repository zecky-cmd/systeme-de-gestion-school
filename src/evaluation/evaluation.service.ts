import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateEvaluationDto } from './dto/create-evaluation.dto';

@Injectable()
export class EvaluationService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(dto: CreateEvaluationDto) {
    return this.databaseService.evaluation.create({
      data: dto as any,
      include: {
        matiereNiveau: {
          include: { matiere: true, classe: true }
        },
        periode: true,
      },
    });
  }

  async findAll(matiereNiveauId?: number, periodeId?: number) {
    return this.databaseService.evaluation.findMany({
      where: {
        AND: [
          matiereNiveauId ? { matiereNiveauId } : {},
          periodeId ? { periodeId } : {},
        ],
      },
      include: {
        matiereNiveau: { include: { matiere: true, classe: true } },
        periode: true,
      },
    });
  }

  async findOne(id: number) {
    const evaluation = await this.databaseService.evaluation.findUnique({
      where: { id },
      include: {
        matiereNiveau: { include: { matiere: true, classe: true } },
        periode: true,
        notes: { include: { eleve: { include: { user: true } } } },
      },
    });
    if (!evaluation) throw new NotFoundException(`Évaluation ${id} non trouvée`);
    return evaluation;
  }

  async remove(id: number) {
    try {
      return await this.databaseService.evaluation.delete({ where: { id } });
    } catch (error: any) {
      if (error.code === 'P2025') throw new NotFoundException(`Évaluation ${id} non trouvée`);
      throw error;
    }
  }
}
