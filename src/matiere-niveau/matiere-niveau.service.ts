import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateMatiereNiveauDto } from './dto/create-matiere-niveau.dto';
import { UpdateMatiereNiveauDto } from './dto/update-matiere-niveau.dto';

@Injectable()
export class MatiereNiveauService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(dto: CreateMatiereNiveauDto) {
    // Vérifier si la classe existe
    const classe = await this.databaseService.classe.findUnique({ where: { id: dto.classeId } });
    if (!classe) throw new NotFoundException(`Classe ${dto.classeId} non trouvée`);

    // Vérifier si la matière existe
    const matiere = await this.databaseService.matiere.findUnique({ where: { id: dto.matiereId } });
    if (!matiere) throw new NotFoundException(`Matière ${dto.matiereId} non trouvée`);

    // Vérifier si l'enseignant existe
    const enseignant = await this.databaseService.enseignant.findUnique({ where: { id: dto.enseignantId } });
    if (!enseignant) throw new NotFoundException(`Enseignant ${dto.enseignantId} non trouvé`);

    // Vérifier l'unicité
    const existing = await this.databaseService.matiereNiveau.findUnique({
      where: {
        classeId_matiereId: {
          classeId: dto.classeId,
          matiereId: dto.matiereId,
        },
      },
    });
    if (existing) throw new ConflictException(`Cette matière est déjà configurée pour cette classe`);

    return this.databaseService.matiereNiveau.create({
      data: dto as any, // Cast Decimal issue handled by Prisma
      include: {
        classe: true,
        matiere: true,
        enseignant: { include: { user: true } },
      },
    });
  }

  async findAll(classeId?: number) {
    return this.databaseService.matiereNiveau.findMany({
      where: classeId ? { classeId } : {},
      include: {
        matiere: true,
        enseignant: { include: { user: true } },
      },
    });
  }

  async findOne(id: number) {
    const mn = await this.databaseService.matiereNiveau.findUnique({
      where: { id },
      include: {
        classe: true,
        matiere: true,
        enseignant: { include: { user: true } },
        evaluations: true,
      },
    });
    if (!mn) throw new NotFoundException(`MatièreNiveau ${id} non trouvé`);
    return mn;
  }

  async update(id: number, dto: UpdateMatiereNiveauDto) {
    try {
      return await this.databaseService.matiereNiveau.update({
        where: { id },
        data: dto as any,
      });
    } catch (error: any) {
      if (error.code === 'P2025') throw new NotFoundException(`MatièreNiveau ${id} non trouvé`);
      throw error;
    }
  }

  async remove(id: number) {
    try {
      return await this.databaseService.matiereNiveau.delete({ where: { id } });
    } catch (error: any) {
      if (error.code === 'P2025') throw new NotFoundException(`MatièreNiveau ${id} non trouvé`);
      throw error;
    }
  }
}
