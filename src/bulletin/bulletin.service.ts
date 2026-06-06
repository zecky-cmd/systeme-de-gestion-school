import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { BulletinCalculService } from './sub-services/bulletin-calcul.service';
import { BulletinRangService } from './sub-services/bulletin-rang.service';
import { CreateBulletinDto } from './dto/create-bulletin.dto';
import { CalculClasseDto } from './dto/calcul-classe.dto';

@Injectable()
export class BulletinService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly calculService: BulletinCalculService,
    private readonly rangService: BulletinRangService,
  ) {}

  async create(dto: CreateBulletinDto) {
    const eleve = await this.databaseService.eleve.findUnique({ where: { id: dto.eleveId } });
    if (!eleve) throw new NotFoundException(`Élève ${dto.eleveId} non trouvé`);

    return this.databaseService.bulletin.create({
      data: dto as any,
      include: { eleve: { include: { user: true } }, periode: true },
    });
  }

  async calculerResultats(eleveId: number, periodeId: number, valideParId: number) {
    return this.calculService.calculerResultats(eleveId, periodeId, valideParId);
  }

  async attribuerRangs(classeId: number, periodeId: number) {
    return this.rangService.attribuerRangs(classeId, periodeId);
  }

  /**
   * Calcule les bulletins de tous les élèves d'une classe et attribue les rangs.
   */
  async calculerClasseResultats(dto: CalculClasseDto) {
    const { classeId, periodeId, valideParId } = dto;

    // 1. Trouver tous les élèves inscrits dans cette classe
    const inscriptions = await this.databaseService.inscription.findMany({
      where: { classeId },
      select: { eleveId: true },
    });

    // 2. Calculer les résultats pour chaque élève (Séquentiel pour la stabilité)
    for (const ins of inscriptions) {
      await this.calculerResultats(ins.eleveId, periodeId, valideParId);
    }

    // 3. Attribuer les rangs (une fois que toutes les moyennes sont là)
    return this.attribuerRangs(classeId, periodeId);
  }

  async findByEleve(eleveId: number) {
    return this.databaseService.bulletin.findMany({
      where: { eleveId },
      include: { periode: true },
      orderBy: { periodeId: 'asc' },
    });
  }

  async findOne(id: number) {
    const bulletin = await this.databaseService.bulletin.findUnique({
      where: { id },
      include: { eleve: { include: { user: true } }, periode: true },
    });
    if (!bulletin) throw new NotFoundException(`Bulletin ${id} non trouvé`);
    return bulletin;
  }

  async publish(id: number) {
    return this.databaseService.bulletin.update({
      where: { id },
      data: { estPublie: true, datePublication: new Date() },
    });
  }

  async remove(id: number) {
    try {
      return await this.databaseService.bulletin.delete({ where: { id } });
    } catch (error: any) {
      if (error.code === 'P2025') throw new NotFoundException(`Bulletin ${id} non trouvé`);
      throw error;
    }
  }

  async getGlobalStats(periodeId?: number) {
    let anneeId: number | undefined;

    if (periodeId) {
      const periode = await this.databaseService.periode.findUnique({
        where: { id: periodeId },
      });
      if (!periode) throw new NotFoundException(`Période ${periodeId} non trouvée`);
      anneeId = periode.anneeId;
    } else {
      const config = await this.databaseService.etablissementConfig.findFirst();
      anneeId = config?.anneeActiveId ?? undefined;
    }

    if (!anneeId) throw new NotFoundException('Aucune année scolaire active ou renseignée');

    const totalEleves = await this.databaseService.inscription.count({
      where: { anneeId },
    });

    const totalGeneres = await this.databaseService.bulletin.count({
      where: periodeId ? { periodeId } : { periode: { anneeId } },
    });

    const totalValides = await this.databaseService.bulletin.count({
      where: {
        ...(periodeId ? { periodeId } : { periode: { anneeId } }),
        moyenneGenerale: { not: null },
      },
    });

    const totalPublies = await this.databaseService.bulletin.count({
      where: {
        ...(periodeId ? { periodeId } : { periode: { anneeId } }),
        estPublie: true,
      },
    });

    return {
      totalEleves,
      totalGeneres,
      totalValides,
      totalPublies,
    };
  }

  async getClassStats(periodeId: number) {
    const periode = await this.databaseService.periode.findUnique({
      where: { id: periodeId },
    });
    if (!periode) throw new NotFoundException(`Période ${periodeId} non trouvée`);
    const anneeId = periode.anneeId;

    const classes = await this.databaseService.classe.findMany({
      where: { anneeId },
      orderBy: { nom: 'asc' },
    });

    const inscriptions = await this.databaseService.inscription.findMany({
      where: { anneeId },
      select: { classeId: true },
    });

    const bulletins = await this.databaseService.bulletin.findMany({
      where: { periodeId },
      select: { classeId: true, moyenneGenerale: true, estPublie: true },
    });

    return classes.map((c) => {
      const classInscriptions = inscriptions.filter((i) => i.classeId === c.id);
      const classBulletins = bulletins.filter((b) => b.classeId === c.id);

      return {
        classeId: c.id,
        nomClasse: c.nom,
        effectifTotal: classInscriptions.length,
        generes: classBulletins.length,
        valides: classBulletins.filter((b) => b.moyenneGenerale !== null).length,
        publies: classBulletins.filter((b) => b.estPublie).length,
      };
    });
  }

  async getBulletinsByClasse(classeId: number, periodeId: number) {
    const bulletins = await this.databaseService.bulletin.findMany({
      where: {
        classeId,
        periodeId,
      },
      include: {
        eleve: {
          include: {
            user: true,
          },
        },
      },
      orderBy: {
        eleve: {
          user: {
            nom: 'asc',
          },
        },
      },
    });

    return bulletins.map((b) => ({
      id: b.id,
      eleveId: b.eleveId,
      eleveMatricule: b.eleve.matricule || '',
      eleveNom: `${b.eleve.user?.nom || ''} ${b.eleve.user?.prenom || ''}`.trim(),
      moyenne: b.moyenneGenerale ? parseFloat(b.moyenneGenerale.toString()) : null,
      rang: b.rang,
      appreciation: b.appreciationGen || '',
      isPublished: b.estPublie,
      isValidated: b.moyenneGenerale !== null,
    }));
  }
}