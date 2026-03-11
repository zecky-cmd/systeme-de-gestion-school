import { PartialType } from '@nestjs/mapped-types';
import { CreatePeriodeDto } from './create-periode.dto';
import { IsOptional, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdatePeriodeDto extends PartialType(CreatePeriodeDto) {
  @IsOptional()
  @Type(() => Date)
  @IsDate({ message: 'La date de clôture doit être une date valide' })
  dateCloture?: Date;
}
