import { IsNotEmpty, IsInt, IsEnum, IsString, MaxLength, IsOptional, IsDate } from 'class-validator';
import { Type } from 'class-transformer';
import { JourCreneau } from '@prisma/client';

export class CreateCreneauDto {
  @IsNotEmpty({ message: 'L\'ID de la matière au niveau est requis' })
  @IsInt()
  matiereNiveauId: number;

  @IsNotEmpty({ message: 'Le jour est requis' })
  @IsEnum(JourCreneau, { message: 'Jour invalide (lun, mar, mer, jeu, ven, sam)' })
  jour: JourCreneau;

  @IsNotEmpty({ message: 'L\'heure de début est requise' })
  @Type(() => Date)
  @IsDate()
  heureDebut: Date;

  @IsNotEmpty({ message: 'L\'heure de fin est requise' })
  @Type(() => Date)
  @IsDate()
  heureFin: Date;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  salle?: string;
}
