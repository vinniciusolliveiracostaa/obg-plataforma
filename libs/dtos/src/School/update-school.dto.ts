import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateSchoolDto } from './create-school.dto';

export class UpdateSchoolDto extends PartialType(
  OmitType(CreateSchoolDto, ['inep']),
) {}
