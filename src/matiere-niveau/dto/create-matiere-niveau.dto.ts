import { IsNotEmpty, IsInt, IsOptional, IsNumber, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateMatiereNiveauDto {
  @IsNotEmpty({ message: 'L\'ID de la classe est requis' })
  @IsInt({ message: 'L\'ID de la classe doit être un nombre entier' })
  classeId: number;

  @IsNotEmpty({ message: 'L\'ID de la matière est requis' })
  @IsInt({ message: 'L\'ID de la matière doit être un nombre entier' })
  matiereId: number;

  @IsNotEmpty({ message: 'L\'ID de l\'enseignant est requis' })
  @IsInt({ message: 'L\'ID de l\'enseignant doit être un nombre entier' })
  enseignantId: number;

  @IsOptional()
  @IsNumber({}, { message: 'Le coefficient doit être un nombre' })
  @Min(0)
  @Max(10)
  coefficient?: number;

  @IsOptional()
  @IsNumber({}, { message: 'La note maximale doit être un nombre' })
  @Min(0)
  @Max(100)
  noteMax?: number;
}
