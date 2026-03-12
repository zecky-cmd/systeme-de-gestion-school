import { IsNotEmpty, IsInt, IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateParentEleveDto {
  @ApiProperty({
    description: 'ID du parent',
    example: 1,
  })
  @IsNotEmpty({ message: 'L\'ID du parent est requis' })
  @IsInt({ message: 'L\'ID du parent doit être un nombre entier' })
  parentId: number;

  @ApiProperty({
    description: 'ID de l\'élève',
    example: 2,
  })
  @IsNotEmpty({ message: 'L\'ID de l\'élève est requis' })
  @IsInt({ message: 'L\'ID de l\'élève doit être un nombre entier' })
  eleveId: number;

  @ApiProperty({
    description: 'Définit si ce parent est le tuteur légal principal',
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean({ message: 'Le tuteur légal doit être un booléen' })
  estTuteurLegal?: boolean;
}
