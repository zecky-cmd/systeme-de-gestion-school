import { IsNotEmpty, IsInt, IsOptional, IsString, MaxLength, IsEnum } from 'class-validator';
import { StatutEnseignant } from '@prisma/client';

export class CreateEnseignantDto {
  @IsNotEmpty({ message: 'L\'ID de l\'utilisateur est requis' })
  @IsInt({ message: 'L\'ID de l\'utilisateur doit être un nombre entier' })
  userId: number;

  @IsOptional()
  @IsString({ message: 'Le matricule doit être une chaîne de caractères' })
  @MaxLength(20, { message: 'Le matricule ne doit pas dépasser 20 caractères' })
  matricule?: string;

  @IsOptional()
  @IsString({ message: 'La spécialité doit être une chaîne de caractères' })
  @MaxLength(100, { message: 'La spécialité ne doit pas dépasser 100 caractères' })
  specialite?: string;

  @IsOptional()
  @IsString({ message: 'Le téléphone doit être une chaîne de caractères' })
  @MaxLength(20, { message: 'Le téléphone ne doit pas dépasser 20 caractères' })
  telephone?: string;

  @IsOptional()
  @IsEnum(StatutEnseignant, { message: 'Le statut doit être "actif" ou "inact"' })
  statut?: StatutEnseignant;
}
