import { PartialType } from '@nestjs/mapped-types';
import { CreateParentEleveDto } from './create-parent-eleve.dto';

export class UpdateParentEleveDto extends PartialType(CreateParentEleveDto) {}
