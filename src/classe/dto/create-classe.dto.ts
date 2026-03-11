import { IsNotEmpty, IsString, MaxLength, IsEnum, IsOptional, IsInt, Min } from 'class-validator';
import { Cycle } from '@prisma/client';

export class CreateClasseDto {
  @IsNotEmpty({ message: 'L\'ID de l\'année scolaire est requis' })
  @IsInt({ message: 'L\'ID de l\'année scolaire doit être un nombre entier' })
  anneeId: number;

  @IsNotEmpty({ message: 'Le nom de la classe est requis' })
  @IsString({ message: 'Le nom doit être une chaîne de caractères' })
  @MaxLength(30, { message: 'Le nom ne doit pas dépasser 30 caractères' })
  nom: string;

  @IsNotEmpty({ message: 'Le cycle est requis' })
  @IsEnum(Cycle, { message: 'Le cycle doit être "col" (collège) ou "lyc" (lycée)' })
  cycle: Cycle;

  @IsNotEmpty({ message: 'Le niveau est requis' })
  @IsString({ message: 'Le niveau doit être une chaîne de caractères' })
  @MaxLength(15, { message: 'Le niveau ne doit pas dépasser 15 caractères' })
  niveau: string;

  @IsOptional()
  @IsString({ message: 'La série doit être une chaîne de caractères' })
  @MaxLength(5, { message: 'La série ne doit pas dépasser 5 caractères' })
  serie?: string;

  @IsOptional()
  @IsString({ message: 'La salle doit être une chaîne de caractères' })
  @MaxLength(20, { message: 'La salle ne doit pas dépasser 20 caractères' })
  salle?: string;

  @IsOptional()
  @IsInt({ message: 'La capacité maximale doit être un nombre entier' })
  @Min(1, { message: 'La capacité maximale doit être d\'au moins 1' })
  capaciteMax?: number;
}
