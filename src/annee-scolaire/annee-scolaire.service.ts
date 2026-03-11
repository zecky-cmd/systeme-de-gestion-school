import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateAnneeScolaireDto } from './dto/create-annee-scolaire.dto';
import { UpdateAnneeScolaireDto } from './dto/update-annee-scolaire.dto';

@Injectable()
export class AnneeScolaireService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createAnneeScolaireDto: CreateAnneeScolaireDto) {
    return this.databaseService.anneeScolaire.create({
      data: createAnneeScolaireDto,
    });
  }

  async findAll() {
    return this.databaseService.anneeScolaire.findMany({
      orderBy: {
        dateDebut: 'desc',
      },
      include: {
        _count: {
          select: {
            classes: true,
            inscriptions: true,
          },
        },
      },
    });
  }

  async findOne(id: number) {
    const annee = await this.databaseService.anneeScolaire.findUnique({
      where: { id },
      include: {
        classes: true,
        periodes: true,
      },
    });
    if (!annee) {
      throw new NotFoundException(`L'année scolaire avec l'ID ${id} n'a pas été trouvée`);
    }
    return annee;
  }

  async update(id: number, updateAnneeScolaireDto: UpdateAnneeScolaireDto) {
    try {
      return await this.databaseService.anneeScolaire.update({
        where: { id },
        data: updateAnneeScolaireDto,
      });
    } catch (error: any) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`L'année scolaire avec l'ID ${id} n'a pas été trouvée pour la mise à jour`);
      }                   
      throw error;
    }
  }

  async remove(id: number) {
    try {
      return await this.databaseService.anneeScolaire.delete({
        where: { id },
      });
    } catch (error: any) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`L'année scolaire avec l'ID ${id} n'a pas été trouvée pour la suppression`);
      }
      throw error;
    }
  }
}
