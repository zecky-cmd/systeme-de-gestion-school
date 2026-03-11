import { PartialType } from '@nestjs/mapped-types';
import { CreateEtablissementConfigDto } from './create-etablissement_config.dto';

export class UpdateEtablissementConfigDto extends PartialType(CreateEtablissementConfigDto) {}
