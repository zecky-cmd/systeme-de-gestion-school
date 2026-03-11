import { IsNotEmpty, IsInt, IsOptional, IsString, MaxLength, IsEnum, IsDate } from 'class-validator';
import { Type } from 'class-transformer';
import { Sexe } from '@prisma/client';

export class CreateEleveDto {
  @IsOptional()
  @IsInt({ message: 'L\'ID de l\'utilisateur doit être un nombre entier' })
  userId?: number;

  @IsOptional()
  @IsString({ message: 'Le matricule doit être une chaîne de caractères' })
  @MaxLength(20, { message: 'Le matricule ne doit pas dépasser 20 caractères' })
  matricule?: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate({ message: 'La date de naissance doit être une date valide' })
  dateNaissance?: Date;

  @IsOptional()
  @IsString({ message: 'Le lieu de naissance doit être une chaîne de caractères' })
  @MaxLength(100, { message: 'Le lieu de naissance ne doit pas dépasser 100 caractères' })
  lieuNaissance?: string;

  @IsNotEmpty({ message: 'Le sexe est requis' })
  @IsEnum(Sexe, { message: 'Le sexe doit être "M" ou "F"' })
  sexe: Sexe;

  @IsOptional()
  @IsString({ message: 'La nationalité doit être une chaîne de caractères' })
  @MaxLength(50, { message: 'La nationalité ne doit pas dépasser 50 caractères' })
  nationalite?: string;

  @IsOptional()
  @IsString({ message: 'L\'URL de la photo doit être une chaîne de caractères' })
  @MaxLength(255, { message: 'L\'URL de la photo ne doit pas dépasser 255 caractères' })
  photoUrl?: string;
}
