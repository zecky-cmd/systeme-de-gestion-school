import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateInscriptionDto } from './dto/create-inscription.dto';
import { UpdateInscriptionDto } from './dto/update-inscription.dto';

@Injectable()
export class InscriptionService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(dto: CreateInscriptionDto) {
    // Vérifier l'année
    const annee = await this.databaseService.anneeScolaire.findUnique({
      where: { id: dto.anneeId },
    });
    if (!annee) {
      throw new NotFoundException(`L'année scolaire avec l'ID ${dto.anneeId} n'existe pas`);
    }

    // Vérifier l'élève
    const eleve = await this.databaseService.eleve.findUnique({
      where: { id: dto.eleveId },
    });
    if (!eleve) {
      throw new NotFoundException(`L'élève avec l'ID ${dto.eleveId} n'existe pas`);
    }

    // Vérifier la classe
    const classe = await this.databaseService.classe.findUnique({
      where: { id: dto.classeId },
    });
    if (!classe) {
      throw new NotFoundException(`La classe avec l'ID ${dto.classeId} n'existe pas`);
    }

    // Vérifier si déjà inscrit pour cette année
    const existing = await this.databaseService.inscription.findUnique({
      where: {
        anneeId_eleveId: {
          anneeId: dto.anneeId,
          eleveId: dto.eleveId,
        },
      },
    });
    if (existing) {
      throw new ConflictException(`L'élève est déjà inscrit pour cette année scolaire`);
    }

    return this.databaseService.inscription.create({
      data: dto,
      include: {
        annee: true,
        eleve: {
          include: {
            user: true,
          },
        },
        classe: true,
      },
    });
  }

  async findAll(anneeId?: number, classeId?: number) {
    return this.databaseService.inscription.findMany({
      where: {
        AND: [
          anneeId ? { anneeId } : {},
          classeId ? { classeId } : {},
        ],
      },
      include: {
        eleve: {
          include: {
            user: {
              select: { nom: true, prenom: true },
            },
          },
        },
        classe: {
          select: { nom: true, niveau: true },
        },
      },
    });
  }

  async findOne(id: number) {
    const inscription = await this.databaseService.inscription.findUnique({
      where: { id },
      include: {
        annee: true,
        eleve: {
          include: {
            user: true,
            parents: {
              include: {
                parent: {
                  include: { user: true },
                },
              },
            },
          },
        },
        classe: true,
      },
    });
    if (!inscription) {
      throw new NotFoundException(`L'inscription avec l'ID ${id} n'a pas été trouvée`);
    }
    return inscription;
  }

  async update(id: number, dto: UpdateInscriptionDto) {
    try {
      return await this.databaseService.inscription.update({
        where: { id },
        data: dto,
      });
    } catch (error: any) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`L'inscription avec l'ID ${id} n'a pas été trouvée pour la mise à jour`);
      }
      throw error;
    }
  }

  async remove(id: number) {
    try {
      return await this.databaseService.inscription.delete({
        where: { id },
      });
    } catch (error: any) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`L'inscription avec l'ID ${id} n'a pas été trouvée pour la suppression`);
      }
      throw error;
    }
  }
}
