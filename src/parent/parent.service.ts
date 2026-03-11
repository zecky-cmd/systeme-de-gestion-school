import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateParentDto } from './dto/create-parent.dto';
import { UpdateParentDto } from './dto/update-parent.dto';

@Injectable()
export class ParentService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(dto: CreateParentDto) {
    const user = await this.databaseService.user.findUnique({
      where: { id: dto.userId },
    });
    if (!user) {
      throw new NotFoundException(`L'utilisateur avec l'ID ${dto.userId} n'existe pas`);
    }

    const existingParent = await this.databaseService.parent.findUnique({
      where: { userId: dto.userId },
    });
    if (existingParent) {
      throw new ConflictException(`Cet utilisateur est déjà enregistré comme parent`);
    }

    return this.databaseService.parent.create({
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
  }

  async findAll() {
    return this.databaseService.parent.findMany({
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
    const parent = await this.databaseService.parent.findUnique({
      where: { id },
      include: {
        user: true,
        eleves: {
          include: {
            eleve: {
              include: {
                user: true,
              },
            },
          },
        },
      },
    });
    if (!parent) {
      throw new NotFoundException(`Le parent avec l'ID ${id} n'a pas été trouvé`);
    }
    return parent;
  }

  async update(id: number, dto: UpdateParentDto) {
    try {
      return await this.databaseService.parent.update({
        where: { id },
        data: dto,
        include: {
          user: {
            select: {
              nom: true,
              prenom: true,
            },
          },
        },
      });
    } catch (error: any) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Le parent avec l'ID ${id} n'a pas été trouvé pour la mise à jour`);
      }
      throw error;
    }
  }

  async remove(id: number) {
    try {
      return await this.databaseService.parent.delete({
        where: { id },
      });
    } catch (error: any) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Le parent avec l'ID ${id} n'a pas été trouvé pour la suppression`);
      }
      throw error;
    }
  }
}
