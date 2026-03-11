import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateEtablissementConfigDto } from './dto/create-etablissement_config.dto';
import { UpdateEtablissementConfigDto } from './dto/update-etablissement_config.dto';

@Injectable()
export class EtablissementConfigService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getConfig() {
    const config = await this.databaseService.etablissementConfig.findFirst({
      include: {
        anneeActive: true,
      },
    });
    if (!config) {
      throw new NotFoundException('Configuration de l\'établissement non trouvée');
    }
    return config;
  }

  async createOrUpdate(dto: CreateEtablissementConfigDto | UpdateEtablissementConfigDto) {
    const existing = await this.databaseService.etablissementConfig.findFirst();

    if (existing) {
      return this.databaseService.etablissementConfig.update({
        where: { id: existing.id },
        data: dto,
        include: { anneeActive: true },
      });
    } else {
      // Pour create, on cast car CreateEtablissementConfigDto a les champs requis
      return this.databaseService.etablissementConfig.create({
        data: dto as any,
        include: { anneeActive: true },
      });
    }
  }

  async setAnneeActive(anneeId: number) {
    const annee = await this.databaseService.anneeScolaire.findUnique({
      where: { id: anneeId },
    });
    if (!annee) {
      throw new NotFoundException(`L'année scolaire avec l'ID ${anneeId} n'existe pas`);
    }

    const existing = await this.databaseService.etablissementConfig.findFirst();
    if (!existing) {
      throw new NotFoundException('Configuration de l\'établissement non trouvée. Veuillez d\'abord créer la configuration.');
    }

    return this.databaseService.etablissementConfig.update({
      where: { id: existing.id },
      data: { anneeActiveId: anneeId },
      include: { anneeActive: true },
    });
  }
}
