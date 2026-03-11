import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateRubriqueFinanciereDto } from './dto/create-rubrique-financiere.dto';
import { UpdateRubriqueFinanciereDto } from './dto/update-rubrique-financiere.dto';

@Injectable()
export class RubriqueFinanciereService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(dto: CreateRubriqueFinanciereDto) {
    const annee = await this.databaseService.anneeScolaire.findUnique({ where: { id: dto.anneeId } });
    if (!annee) throw new NotFoundException(`Année scolaire ${dto.anneeId} non trouvée`);

    return this.databaseService.rubriqueFinanciere.create({
      data: dto as any,
    });
  }

  async findAll(anneeId?: number) {
    return this.databaseService.rubriqueFinanciere.findMany({
      where: anneeId ? { anneeId } : {},
      orderBy: { ordre: 'asc' },
    });
  }

  async findOne(id: number) {
    const rubrique = await this.databaseService.rubriqueFinanciere.findUnique({ where: { id } });
    if (!rubrique) throw new NotFoundException(`Rubrique financière ${id} non trouvée`);
    return rubrique;
  }

  async update(id: number, dto: UpdateRubriqueFinanciereDto) {
    try {
      return await this.databaseService.rubriqueFinanciere.update({
        where: { id },
        data: dto as any,
      });
    } catch (error: any) {
      if (error.code === 'P2025') throw new NotFoundException(`Rubrique financière ${id} non trouvée`);
      throw error;
    }
  }

  async remove(id: number) {
    try {
      return await this.databaseService.rubriqueFinanciere.delete({ where: { id } });
    } catch (error: any) {
      if (error.code === 'P2025') throw new NotFoundException(`Rubrique financière ${id} non trouvée`);
      throw error;
    }
  }
}
