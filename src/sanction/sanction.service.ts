import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateSanctionDto } from './dto/create-sanction.dto';

@Injectable()
export class SanctionService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(dto: CreateSanctionDto) {
    const eleve = await this.databaseService.eleve.findUnique({ where: { id: dto.eleveId } });
    if (!eleve) throw new NotFoundException(`Élève ${dto.eleveId} non trouvé`);

    return this.databaseService.sanction.create({
      data: dto,
      include: { eleve: { include: { user: true } }, prononcePar: true },
    });
  }

  async findAll(eleveId?: number) {
    return this.databaseService.sanction.findMany({
      where: eleveId ? { eleveId } : {},
      include: { eleve: { include: { user: true } }, prononcePar: true },
      orderBy: { date: 'desc' },
    });
  }

  async remove(id: number) {
    try {
      return await this.databaseService.sanction.delete({ where: { id } });
    } catch (error: any) {
      if (error.code === 'P2025') throw new NotFoundException(`Sanction ${id} non trouvée`);
      throw error;
    }
  }
}
