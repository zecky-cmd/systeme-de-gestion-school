import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateEnseignantDto } from './dto/create-enseignant.dto';
import { UpdateEnseignantDto } from './dto/update-enseignant.dto';

@Injectable()
export class EnseignantService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(dto: CreateEnseignantDto) {
    // Vérifier si l'utilisateur existe
    const user = await this.databaseService.user.findUnique({
      where: { id: dto.userId },
    });
    if (!user) {
      throw new NotFoundException(`L'utilisateur avec l'ID ${dto.userId} n'existe pas`);
    }

    // Vérifier si l'utilisateur est déjà un enseignant
    const existingEns = await this.databaseService.enseignant.findUnique({
      where: { userId: dto.userId },
    });
    if (existingEns) {
      throw new ConflictException(`Cet utilisateur est déjà enregistré comme enseignant`);
    }

    // Vérifier le matricule
    if (dto.matricule) {
      const existingMat = await this.databaseService.enseignant.findUnique({
        where: { matricule: dto.matricule },
      });
      if (existingMat) {
        throw new ConflictException(`Le matricule ${dto.matricule} est déjà utilisé`);
      }
    }

    return this.databaseService.enseignant.create({
      data: dto,
      include: {
        user: {
          select: {
            nom: true,
            prenom: true,
            email: true,
            role: true,
          },
        },
      },
    });
  }

  async findAll() {
    return this.databaseService.enseignant.findMany({
      include: {
        user: {
          select: {
            nom: true,
            prenom: true,
            email: true,
          },
        },
      },
      orderBy: {
        user: {
          nom: 'asc',
        },
      },
    });
  }

  async findOne(id: number) {
    const enseignant = await this.databaseService.enseignant.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            nom: true,
            prenom: true,
            email: true,
            role: true,
            estActif: true,
          },
        },
        matieresNiveau: {
          include: {
            matiere: true,
            classe: true,
          },
        },
      },
    });
    if (!enseignant) {
      throw new NotFoundException(`L'enseignant avec l'ID ${id} n'a pas été trouvé`);
    }
    return enseignant;
  }

  async update(id: number, dto: UpdateEnseignantDto) {
    try {
      if (dto.matricule) {
        const existing = await this.databaseService.enseignant.findUnique({
          where: { matricule: dto.matricule },
        });
        if (existing && existing.id !== id) {
          throw new ConflictException(`Le matricule ${dto.matricule} est déjà utilisé`);
        }
      }

      return await this.databaseService.enseignant.update({
        where: { id },
        data: dto,
        include: {
          user: {
            select: {
              nom: true,
              prenom: true,
              email: true,
            },
          },
        },
      });
    } catch (error: any) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`L'enseignant avec l'ID ${id} n'a pas été trouvé pour la mise à jour`);
      }
      throw error;
    }
  }

  async remove(id: number) {
    try {
      return await this.databaseService.enseignant.delete({
        where: { id },
      });
    } catch (error: any) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`L'enseignant avec l'ID ${id} n'a pas été trouvé pour la suppression`);
      }
      throw error;
    }
  }
}
