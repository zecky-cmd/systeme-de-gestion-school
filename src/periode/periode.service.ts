import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreatePeriodeDto } from './dto/create-periode.dto';
import { UpdatePeriodeDto } from './dto/update-periode.dto';

@Injectable()
export class PeriodeService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(dto: CreatePeriodeDto) {
    const annee = await this.databaseService.anneeScolaire.findUnique({
      where: { id: dto.anneeId },
    });
    if (!annee) {
      throw new NotFoundException(`L'année scolaire avec l'ID ${dto.anneeId} n'existe pas`);
    }

    return this.databaseService.periode.create({
      data: dto,
    });
  }

  async findAll(anneeId?: number) {
    return this.databaseService.periode.findMany({
      where: anneeId ? { anneeId } : {},
      orderBy: { numero: 'asc' },
      include: {
        annee: {
          select: { libelle: true },
        },
      },
    });
  }

  async findOne(id: number) {
    const periode = await this.databaseService.periode.findUnique({
      where: { id },
      include: {
        annee: true,
        evaluations: true,
      },
    });
    if (!periode) {
      throw new NotFoundException(`La période avec l'ID ${id} n'a pas été trouvée`);
    }
    return periode;
  }

  async update(id: number, dto: UpdatePeriodeDto) {
    try {
      if (dto.anneeId) {
        const annee = await this.databaseService.anneeScolaire.findUnique({
          where: { id: dto.anneeId },
        });
        if (!annee) {
          throw new NotFoundException(`L'année scolaire avec l'ID ${dto.anneeId} n'existe pas`);
        }
      }

      return await this.databaseService.periode.update({
        where: { id },
        data: dto,
      });
    } catch (error: any) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`La période avec l'ID ${id} n'a pas été trouvée pour la mise à jour`);
      }
      throw error;
    }
  }

  async remove(id: number) {
    try {
      return await this.databaseService.periode.delete({
        where: { id },
      });
    } catch (error: any) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`La période avec l'ID ${id} n'a pas été trouvée pour la suppression`);
      }
      throw error;
    }
  }
}
