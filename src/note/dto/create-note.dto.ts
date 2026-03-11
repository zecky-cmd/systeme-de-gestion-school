import { IsNotEmpty, IsInt, IsNumber, Min, Max, IsBoolean, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateNoteDto {
  @IsNotEmpty({ message: 'L\'ID de l\'élève est requis' })
  @IsInt()
  eleveId: number;

  @IsNotEmpty({ message: 'L\'ID de l\'évaluation est requis' })
  @IsInt()
  evaluationId: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  valeur?: number;

  @IsOptional()
  @IsBoolean()
  estAbsent?: boolean;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  appreciation?: string;
}
