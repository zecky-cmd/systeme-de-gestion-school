import { IsNotEmpty, IsInt, IsNumber, Min, Max, IsEnum, IsOptional, IsString, IsBoolean, IsUrl, MaxLength } from 'class-validator';
import { MentionBulletin } from '@prisma/client';

export class CreateBulletinDto {
  @IsNotEmpty()
  @IsInt()
  eleveId: number;

  @IsNotEmpty()
  @IsInt()
  periodeId: number;

  @IsNotEmpty()
  @IsInt()
  valideParId: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(20)
  moyenneGenerale?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  rang?: number;

  @IsOptional()
  @IsEnum(MentionBulletin)
  mention?: MentionBulletin;

  @IsOptional()
  @IsString()
  appreciationGen?: string;

  @IsOptional()
  @IsBoolean()
  estPublie?: boolean;

  @IsOptional()
  @IsUrl()
  @MaxLength(255)
  pdfUrl?: string;
}
