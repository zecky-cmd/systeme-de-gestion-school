import { IsNotEmpty, IsInt, IsNumber, Min, IsEnum, IsString, MaxLength, IsOptional, IsUrl } from 'class-validator';
import { ModePaiement } from '@prisma/client';

export class CreatePaiementDto {
  @IsNotEmpty({ message: 'L\'ID de l\'élève est requis' })
  @IsInt({ message: 'L\'ID doit être un nombre entier' })
  eleveId: number;

  @IsNotEmpty({ message: 'L\'ID de la rubrique est requis' })
  @IsInt({ message: 'L\'ID doit être un nombre entier' })
  rubriqueId: number;

  @IsNotEmpty({ message: 'L\'ID de l\'encaisseur est requis' })
  @IsInt({ message: 'L\'ID doit être un nombre entier' })
  encaisseParId: number;

  @IsNotEmpty({ message: 'Le montant est requis' })
  @IsNumber({}, { message: 'Le montant doit être un nombre' })
  @Min(0)
  montant: number;

  @IsNotEmpty({ message: 'Le mode de paiement est requis' })
  @IsEnum(ModePaiement, { message: 'Mode invalide (esp, mobile, cheque)' })
  mode: ModePaiement;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  reference?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  recuNum?: string;

  @IsOptional()
  @IsUrl({}, { message: 'L\'URL du PDF doit être valide' })
  @MaxLength(255)
  pdfUrl?: string;
}
