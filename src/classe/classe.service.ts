import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateClasseDto } from './dto/create-classe.dto';
import { UpdateClasseDto } from './dto/update-classe.dto';

@Injectable()
export class ClasseService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createClasseDto: CreateClasseDto) {
    // Vérifier si l'année scolaire existe
    const annee = await this.databaseService.anneeScolaire.findUnique({
      where: { id: createClasseDto.anneeId },
    });
    if (!annee) {
      throw new NotFoundException(`L'année scolaire avec l'ID ${createClasseDto.anneeId} n'existe pas`);
    }

    return this.databaseService.classe.create({
      data: createClasseDto,
    });
  }

  async findAll(anneeId?: number) {
    return this.databaseService.classe.findMany({
      where: anneeId ? { anneeId } : {},
      include: {
        annee: {
          select: {
            libelle: true,
          },
        },
        _count: {
          select: {
            inscriptions: true,
          },
        },
      },
      orderBy: {
        niveau: 'asc',
      },
    });
  }

  async findOne(id: number) {
    const classe = await this.databaseService.classe.findUnique({
      where: { id },
      include: {
        annee: true,
        inscriptions: {
          include: {
            eleve: true,
          },
        },
        matieresNiveau: {
          include: {
            matiere: true,
            enseignant: true,
          },
        },
      },
    });
    if (!classe) {
      throw new NotFoundException(`La classe avec l'ID ${id} n'a pas été trouvée`);
    }
    return classe;
  }

  async update(id: number, updateClasseDto: UpdateClasseDto) {
    try {
      if (updateClasseDto.anneeId) {
        const annee = await this.databaseService.anneeScolaire.findUnique({
          where: { id: updateClasseDto.anneeId },
        });
        if (!annee) {
          throw new NotFoundException(`L'année scolaire avec l'ID ${updateClasseDto.anneeId} n'existe pas`);
        }
      }

      return await this.databaseService.classe.update({
        where: { id },
        data: updateClasseDto,
      });
    } catch (error: any) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`La classe avec l'ID ${id} n'a pas été trouvée pour la mise à jour`);
      }
      throw error;
    }
  }

  async remove(id: number) {
    try {
      return await this.databaseService.classe.delete({
        where: { id },
      });
    } catch (error: any) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`La classe avec l'ID ${id} n'a pas été trouvée pour la suppression`);
      }
      throw error;
    }
  }
}
