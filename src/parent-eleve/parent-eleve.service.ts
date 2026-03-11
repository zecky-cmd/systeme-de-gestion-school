import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateParentEleveDto } from './dto/create-parent-eleve.dto';
import { UpdateParentEleveDto } from './dto/update-parent-eleve.dto';

@Injectable()
export class ParentEleveService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(dto: CreateParentEleveDto) {
    // Vérifier si le parent existe
    const parent = await this.databaseService.parent.findUnique({
      where: { id: dto.parentId },
    });
    if (!parent) {
      throw new NotFoundException(`Le parent avec l'ID ${dto.parentId} n'existe pas`);
    }

    // Vérifier si l'élève existe
    const eleve = await this.databaseService.eleve.findUnique({
      where: { id: dto.eleveId },
    });
    if (!eleve) {
      throw new NotFoundException(`L'élève avec l'ID ${dto.eleveId} n'existe pas`);
    }

    // Vérifier si le lien existe déjà
    const existing = await this.databaseService.parentEleve.findUnique({
      where: {
        parentId_eleveId: {
          parentId: dto.parentId,
          eleveId: dto.eleveId,
        },
      },
    });
    if (existing) {
      throw new ConflictException(`Ce lien de parenté existe déjà`);
    }

    return this.databaseService.parentEleve.create({
      data: dto,
    });
  }

  async findAll() {
    return this.databaseService.parentEleve.findMany({
      include: {
        parent: {
          include: {
            user: true,
          },
        },
        eleve: {
          include: {
            user: true,
          },
        },
      },
    });
  }

  async remove(parentId: number, eleveId: number) {
    try {
      return await this.databaseService.parentEleve.delete({
        where: {
          parentId_eleveId: {
            parentId,
            eleveId,
          },
        },
      });
    } catch (error: any) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Le lien de parenté n'a pas été trouvé pour la suppression`);
      }
      throw error;
    }
  }
}
