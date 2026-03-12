import { IsNotEmpty, IsInt, IsOptional, IsNumber, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMatiereNiveauDto {
  @ApiProperty({
    description: 'ID de la classe',
    example: 1,
  })
  @IsNotEmpty({ message: 'L\'ID de la classe est requis' })
  @IsInt({ message: 'L\'ID de la classe doit être un nombre entier' })
  classeId: number;

  @ApiProperty({
    description: 'ID de la matière',
    example: 1,
  })
  @IsNotEmpty({ message: 'L\'ID de la matière est requis' })
  @IsInt({ message: 'L\'ID de la matière doit être un nombre entier' })
  matiereId: number;

  @ApiProperty({
    description: 'ID de l\'enseignant titulaire pour cette matière dans cette classe',
    example: 1,
  })
  @IsNotEmpty({ message: 'L\'ID de l\'enseignant est requis' })
  @IsInt({ message: 'L\'ID de l\'enseignant doit être un nombre entier' })
  enseignantId: number;

  @ApiProperty({
    description: 'Coefficient de la matière (ex: 2, 3, 5)',
    example: 2,
    required: false,
  })
  @IsOptional()
  @IsNumber({}, { message: 'Le coefficient doit être un nombre' })
  @Min(0)
  @Max(10)
  coefficient?: number;

  @ApiProperty({
    description: 'Note maximale possible (généralement 20)',
    example: 20,
    required: false,
  })
  @IsOptional()
  @IsNumber({}, { message: 'La note maximale doit être un nombre' })
  @Min(0)
  @Max(100)
  noteMax?: number;
}
