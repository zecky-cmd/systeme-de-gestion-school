import { IsNotEmpty, IsInt, IsBoolean, IsOptional } from 'class-validator';

export class CreateParentEleveDto {
  @IsNotEmpty({ message: 'L\'ID du parent est requis' })
  @IsInt({ message: 'L\'ID du parent doit être un nombre entier' })
  parentId: number;

  @IsNotEmpty({ message: 'L\'ID de l\'élève est requis' })
  @IsInt({ message: 'L\'ID de l\'élève doit être un nombre entier' })
  eleveId: number;

  @IsOptional()
  @IsBoolean({ message: 'Le tuteur légal doit être un booléen' })
  estTuteurLegal?: boolean;
}
