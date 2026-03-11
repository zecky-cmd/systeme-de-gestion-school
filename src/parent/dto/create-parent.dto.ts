import { IsNotEmpty, IsInt, IsOptional, IsString, MaxLength, IsEnum } from 'class-validator';
import { LienParent } from '@prisma/client';

export class CreateParentDto {
  @IsNotEmpty({ message: 'L\'ID de l\'utilisateur est requis' })
  @IsInt({ message: 'L\'ID de l\'utilisateur doit être un nombre entier' })
  userId: number;

  @IsOptional()
  @IsString({ message: 'Le téléphone doit être une chaîne de caractères' })
  @MaxLength(20, { message: 'Le téléphone ne doit pas dépasser 20 caractères' })
  telephone?: string;

  @IsNotEmpty({ message: 'Le lien de parenté est requis' })
  @IsEnum(LienParent, { message: 'Le lien doit être "pere", "mere" ou "tuteur"' })
  lien: LienParent;
}
