import { PartialType } from '@nestjs/mapped-types';
import { CreateMatiereNiveauDto } from './create-matiere-niveau.dto';

export class UpdateMatiereNiveauDto extends PartialType(CreateMatiereNiveauDto) {}
