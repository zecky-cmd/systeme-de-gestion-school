import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreatePaiementDto } from './dto/create-paiement.dto';
import { UpdatePaiementDto } from './dto/update-paiement.dto';

@Injectable()
export class PaiementService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(dto: CreatePaiementDto) {
    // Vérifier l'élève
    const eleve = await this.databaseService.eleve.findUnique({ where: { id: dto.eleveId } });
    if (!eleve) throw new NotFoundException(`Élève ${dto.eleveId} non trouvé`);

    // Vérifier la rubrique
    const rubrique = await this.databaseService.rubriqueFinanciere.findUnique({ where: { id: dto.rubriqueId } });
    if (!rubrique) throw new NotFoundException(`Rubrique ${dto.rubriqueId} non trouvée`);

    // Vérifier l'encaisseur
    const user = await this.databaseService.user.findUnique({ where: { id: dto.encaisseParId } });
    if (!user) throw new NotFoundException(`Utilisateur ${dto.encaisseParId} non trouvé`);

    return this.databaseService.paiement.create({
      data: dto as any,
      include: {
        eleve: { include: { user: true } },
        rubrique: true,
        encaissePar: true,
      },
    });
  }

  async findAll(eleveId?: number) {
    return this.databaseService.paiement.findMany({
      where: eleveId ? { eleveId } : {},
      include: {
        rubrique: true,
        eleve: { include: { user: true } },
      },
      orderBy: { datePaiement: 'desc' },
    });
  }

  async findOne(id: number) {
    const payment = await this.databaseService.paiement.findUnique({
      where: { id },
      include: {
        eleve: { include: { user: true } },
        rubrique: true,
        encaissePar: true,
      },
    });
    if (!payment) throw new NotFoundException(`Paiement ${id} non trouvé`);
    return payment;
  }

  async update(id: number, dto: UpdatePaiementDto) {
    try {
      return await this.databaseService.paiement.update({
        where: { id },
        data: dto as any,
      });
    } catch (error: any) {
      if (error.code === 'P2025') throw new NotFoundException(`Paiement ${id} non trouvé`);
      throw error;
    }
  }

  async remove(id: number) {
    try {
      return await this.databaseService.paiement.delete({ where: { id } });
    } catch (error: any) {
      if (error.code === 'P2025') throw new NotFoundException(`Paiement ${id} non trouvé`);
      throw error;
    }
  }
}
