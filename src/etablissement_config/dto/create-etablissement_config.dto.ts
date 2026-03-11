import { IsNotEmpty, IsString, MaxLength, IsOptional, IsEmail, IsInt, IsUrl } from 'class-validator';

export class CreateEtablissementConfigDto {
  @IsOptional()
  @IsInt({ message: 'L\'ID de l\'année active doit être un nombre entier' })
  anneeActiveId?: number;

  @IsNotEmpty({ message: 'Le nom de l\'établissement est requis' })
  @IsString({ message: 'Le nom doit être une chaîne de caractères' })
  @MaxLength(150, { message: 'Le nom ne doit pas dépasser 150 caractères' })
  nom: string;

  @IsOptional()
  @IsString({ message: 'L\'adresse doit être une chaîne de caractères' })
  adresse?: string;

  @IsOptional()
  @IsString({ message: 'Le téléphone doit être une chaîne de caractères' })
  @MaxLength(20, { message: 'Le téléphone ne doit pas dépasser 20 caractères' })
  telephone?: string;

  @IsOptional()
  @IsEmail({}, { message: 'L\'email doit être une adresse valide' })
  @MaxLength(100, { message: 'L\'email ne doit pas dépasser 100 caractères' })
  email?: string;

  @IsOptional()
  @IsString({ message: 'L\'URL du logo doit être une chaîne de caractères' })
  @MaxLength(255, { message: 'L\'URL du logo ne doit pas dépasser 255 caractères' })
  logoUrl?: string;

  @IsOptional()
  @IsString({ message: 'La devise doit être une chaîne de caractères' })
  @MaxLength(10, { message: 'La devise ne doit pas dépasser 10 caractères' })
  devise?: string;
}
