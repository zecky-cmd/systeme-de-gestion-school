import { IsNotEmpty, IsInt, IsString, MaxLength } from 'class-validator';

export class CreateMessageDto {
  @IsNotEmpty()
  @IsInt()
  expediteurId: number;

  @IsNotEmpty()
  @IsInt()
  destinataireId: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(200)
  sujet: string;

  @IsNotEmpty()
  @IsString()
  corps: string;
}
