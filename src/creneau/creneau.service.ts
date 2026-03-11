import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateCreneauDto } from './dto/create-creneau.dto';

@Injectable()
export class CreneauService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(dto: CreateCreneauDto) {
    const mn = await this.databaseService.matiereNiveau.findUnique({ where: { id: dto.matiereNiveauId } });
    if (!mn) throw new NotFoundException(`MatièreNiveau ${dto.matiereNiveauId} non trouvé`);

    return this.databaseService.creneau.create({
      data: dto,
      include: {
        matiereNiveau: { include: { matiere: true, classe: true } },
      },
    });
  }

  async findAll(classeId?: number) {
    return this.databaseService.creneau.findMany({
      where: classeId ? { matiereNiveau: { classeId } } : {},
      include: {
        matiereNiveau: { include: { matiere: true, classe: true, enseignant: { include: { user: true } } } },
      },
      orderBy: [
        { jour: 'asc' },
        { heureDebut: 'asc' },
      ],
    });
  }

  async remove(id: number) {
    try {
      return await this.databaseService.creneau.delete({ where: { id } });
    } catch (error: any) {
      if (error.code === 'P2025') throw new NotFoundException(`Créneau ${id} non trouvé`);
      throw error;
    }
  }
}
