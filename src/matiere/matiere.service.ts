import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateMatiereDto } from './dto/create-matiere.dto';
import { UpdateMatiereDto } from './dto/update-matiere.dto';

@Injectable()
export class MatiereService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createMatiereDto: CreateMatiereDto) {
    // Vérifier si le code existe déjà
    const existing = await this.databaseService.matiere.findUnique({
      where: { code: createMatiereDto.code },
    });
    if (existing) {
      throw new ConflictException(`Une matière avec le code ${createMatiereDto.code} existe déjà`);
    }

    return this.databaseService.matiere.create({
      data: createMatiereDto,
    });
  }

  async findAll() {
    return this.databaseService.matiere.findMany({
      orderBy: {
        nom: 'asc',
      },
    });
  }

  async findOne(id: number) {
    const matiere = await this.databaseService.matiere.findUnique({
      where: { id },
      include: {
        matieresNiveau: {
          include: {
            classe: true,
            enseignant: true,
          },
        },
      },
    });
    if (!matiere) {
      throw new NotFoundException(`La matière avec l'ID ${id} n'a pas été trouvée`);
    }
    return matiere;
  }

  async update(id: number, updateMatiereDto: UpdateMatiereDto) {
    try {
      if (updateMatiereDto.code) {
        const existing = await this.databaseService.matiere.findUnique({
          where: { code: updateMatiereDto.code },
        });
        if (existing && existing.id !== id) {
          throw new ConflictException(`Une matière avec le code ${updateMatiereDto.code} existe déjà`);
        }
      }

      return await this.databaseService.matiere.update({
        where: { id },
        data: updateMatiereDto,
      });
    } catch (error: any) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`La matière avec l'ID ${id} n'a pas été trouvée pour la mise à jour`);
      }
      throw error;
    }
  }

  async remove(id: number) {
    try {
      return await this.databaseService.matiere.delete({
        where: { id },
      });
    } catch (error: any) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`La matière avec l'ID ${id} n'a pas été trouvée pour la suppression`);
      }
      throw error;
    }
  }
}
