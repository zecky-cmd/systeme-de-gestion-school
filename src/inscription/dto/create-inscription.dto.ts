import { IsNotEmpty, IsInt, IsEnum, IsOptional } from 'class-validator';
import { StatutInscription } from '@prisma/client';

export class CreateInscriptionDto {
  @IsNotEmpty({ message: 'L\'ID de l\'année scolaire est requis' })
  @IsInt({ message: 'L\'ID de l\'année scolaire doit être un nombre entier' })
  anneeId: number;

  @IsNotEmpty({ message: 'L\'ID de l\'élève est requis' })
  @IsInt({ message: 'L\'ID de l\'élève doit être un nombre entier' })
  eleveId: number;

  @IsNotEmpty({ message: 'L\'ID de la classe est requis' })
  @IsInt({ message: 'L\'ID de la classe doit être un nombre entier' })
  classeId: number;

  @IsOptional()
  @IsEnum(StatutInscription, { message: 'Le statut doit être "ins", "ab" ou "exc"' })
  statut?: StatutInscription;
}
