import { IsNotEmpty, IsString, MaxLength, IsInt, IsDate, IsEnum, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { StatutPeriode } from '@prisma/client';

export class CreatePeriodeDto {
  @IsNotEmpty({ message: 'L\'ID de l\'année scolaire est requis' })
  @IsInt({ message: 'L\'ID de l\'année scolaire doit être un nombre entier' })
  anneeId: number;

  @IsNotEmpty({ message: 'Le numéro de la période est requis' })
  @IsInt({ message: 'Le numéro doit être un nombre entier' })
  numero: number;

  @IsNotEmpty({ message: 'Le libellé est requis' })
  @IsString({ message: 'Le libellé doit être une chaîne de caractères' })
  @MaxLength(30, { message: 'Le libellé ne doit pas dépasser 30 caractères' })
  libelle: string;

  @IsNotEmpty({ message: 'La date de début est requise' })
  @Type(() => Date)
  @IsDate({ message: 'La date de début doit être une date valide' })
  dateDebut: Date;

  @IsNotEmpty({ message: 'La date de fin est requise' })
  @Type(() => Date)
  @IsDate({ message: 'La date de fin doit être une date valide' })
  dateFin: Date;

  @IsOptional()
  @IsEnum(StatutPeriode, { message: 'Le statut doit être "ouv", "clos" ou "arch"' })
  statut?: StatutPeriode;
}
