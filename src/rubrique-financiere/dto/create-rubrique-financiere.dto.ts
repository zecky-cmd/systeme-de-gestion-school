import { IsNotEmpty, IsInt, IsString, MaxLength, IsNumber, Min, IsEnum, IsBoolean, IsOptional } from 'class-validator';
import { CycleMatiere } from '@prisma/client';

export class CreateRubriqueFinanciereDto {
  @IsNotEmpty({ message: 'L\'ID de l\'année scolaire est requis' })
  @IsInt({ message: 'L\'ID doit être un nombre entier' })
  anneeId: number;

  @IsNotEmpty({ message: 'Le libellé est requis' })
  @IsString({ message: 'Le libellé doit être une chaîne de caractères' })
  @MaxLength(100)
  libelle: string;

  @IsNotEmpty({ message: 'Le montant est requis' })
  @IsNumber({}, { message: 'Le montant doit être un nombre' })
  @Min(0)
  montant: number;

  @IsOptional()
  @IsEnum(CycleMatiere, { message: 'Cycle invalide (col, lyc, tous)' })
  cycle?: CycleMatiere;

  @IsOptional()
  @IsBoolean({ message: 'L\'obligation doit être un booléen' })
  estObligatoire?: boolean;

  @IsOptional()
  @IsInt({ message: 'L\'ordre doit être un nombre entier' })
  @Min(1)
  ordre?: number;
}
