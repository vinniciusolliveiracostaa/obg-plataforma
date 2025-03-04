import { OmitType } from "@nestjs/mapped-types";
import { CreateSchoolDto } from "./create-school.dto";



export class UpdateSchoolDto extends OmitType(CreateSchoolDto, ['userId']) {}