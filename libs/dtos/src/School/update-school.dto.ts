import { OmitType, PartialType } from "@nestjs/swagger";
import { CreateSchoolDto } from "./create-school.dto";

export class UpdateSchoolDto extends PartialType(
  // @ts-ignore
  OmitType(CreateSchoolDto, ["inep"] as const),
) {}
