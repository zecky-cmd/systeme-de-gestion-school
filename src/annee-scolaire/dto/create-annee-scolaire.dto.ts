import { IsNotEmpty, IsString, MaxLength, IsEnum, IsOptional, IsDate } from 'class-validator';
import { Type } from 'class-transformer';
import { ModeEval } from '@prisma/client';

export class CreateAnneeScolaireDto {
  @IsNotEmpty({ message: 'Le libellé est requis' })
  @IsString({ message: 'Le libellé doit être une chaîne de caractères' })
  @MaxLength(20, { message: 'Le libellé ne doit pas dépasser 20 caractères' })
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
  @IsEnum(ModeEval, { message: 'Le mode d\'évaluation doit être "trim" ou "sem"' })
  modeEval?: ModeEval;
}
