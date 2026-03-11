import { IsNotEmpty, IsInt, IsEnum, IsString, IsDate, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { TypeSanction } from '@prisma/client';

export class CreateSanctionDto {
  @IsNotEmpty()
  @IsInt()
  eleveId: number;

  @IsNotEmpty()
  @IsInt()
  prononceParId: number;

  @IsNotEmpty()
  @IsEnum(TypeSanction)
  type: TypeSanction;

  @IsNotEmpty()
  @IsString()
  motif: string;

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  date: Date;

  @IsOptional()
  @IsInt()
  @Min(0)
  dureeJours?: number;
}
