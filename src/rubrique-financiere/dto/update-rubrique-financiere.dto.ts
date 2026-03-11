import { PartialType } from '@nestjs/mapped-types';
import { CreateRubriqueFinanciereDto } from './create-rubrique-financiere.dto';

export class UpdateRubriqueFinanciereDto extends PartialType(CreateRubriqueFinanciereDto) {}
