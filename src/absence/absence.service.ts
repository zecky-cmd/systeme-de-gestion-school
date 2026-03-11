import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateAbsenceDto } from './dto/create-absence.dto';

@Injectable()
export class AbsenceService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(dto: CreateAbsenceDto) {
    const eleve = await this.databaseService.eleve.findUnique({ where: { id: dto.eleveId } });
    if (!eleve) throw new NotFoundException(`Élève ${dto.eleveId} non trouvé`);

    if (dto.creneauId) {
      const creneau = await this.databaseService.creneau.findUnique({ where: { id: dto.creneauId } });
      if (!creneau) throw new NotFoundException(`Créneau ${dto.creneauId} non trouvé`);
    }

    return this.databaseService.absence.create({
      data: dto,
      include: {
        eleve: { include: { user: true } },
        creneau: { include: { matiereNiveau: { include: { matiere: true } } } },
      },
    });
  }

  async findAll(eleveId?: number, date?: Date) {
    return this.databaseService.absence.findMany({
      where: {
        AND: [
          eleveId ? { eleveId } : {},
          date ? { date } : {},
        ],
      },
      include: {
        eleve: { include: { user: true } },
        creneau: { include: { matiereNiveau: { include: { matiere: true } } } },
      },
      orderBy: { date: 'desc' },
    });
  }

  async remove(id: number) {
    try {
      return await this.databaseService.absence.delete({ where: { id } });
    } catch (error: any) {
      if (error.code === 'P2025') throw new NotFoundException(`Absence ${id} non trouvée`);
      throw error;
    }
  }
}
