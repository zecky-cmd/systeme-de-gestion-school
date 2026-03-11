import { IsNotEmpty, IsInt, IsEnum, IsString, IsOptional, IsDate, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';
import { TypeAbsence } from '@prisma/client';

export class CreateAbsenceDto {
  @IsNotEmpty({ message: 'L\'ID de l\'élève est requis' })
  @IsInt()
  eleveId: number;

  @IsOptional()
  @IsInt()
  creneauId?: number;

  @IsOptional()
  @IsInt()
  saisiParId?: number;

  @IsNotEmpty({ message: 'La date est requise' })
  @Type(() => Date)
  @IsDate()
  date: Date;

  @IsOptional()
  @IsEnum(TypeAbsence, { message: 'Type d\'absence invalide (just, injust, retard)' })
  type?: TypeAbsence;

  @IsOptional()
  @IsString()
  motif?: string;

  @IsOptional()
  @IsBoolean()
  notifEnvoyee?: boolean;
}
