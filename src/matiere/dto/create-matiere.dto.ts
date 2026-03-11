import { IsNotEmpty, IsString, MaxLength, IsEnum, IsOptional, IsHexColor } from 'class-validator';
import { CycleMatiere } from '@prisma/client';

export class CreateMatiereDto {
  @IsNotEmpty({ message: 'Le nom de la matière est requis' })
  @IsString({ message: 'Le nom doit être une chaîne de caractères' })
  @MaxLength(80, { message: 'Le nom ne doit pas dépasser 80 caractères' })
  nom: string;

  @IsNotEmpty({ message: 'Le code de la matière est requis' })
  @IsString({ message: 'Le code doit être une chaîne de caractères' })
  @MaxLength(10, { message: 'Le code ne doit pas dépasser 10 caractères' })
  code: string;

  @IsOptional()
  @IsEnum(CycleMatiere, { message: 'Le cycle doit être "col", "lyc" ou "tous"' })
  cycle?: CycleMatiere;

  @IsOptional()
  @IsString({ message: 'La couleur doit être une chaîne de caractères' })
  @MaxLength(7, { message: 'La couleur ne doit pas dépasser 7 caractères' })
  @IsHexColor({ message: 'La couleur doit être un code hexadécimal valide' })
  couleur?: string;
}
