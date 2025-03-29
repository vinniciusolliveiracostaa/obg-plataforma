import { ApiProperty } from "@nestjs/swagger";
import {
  ArrayMaxSize,
  ArrayMinSize,
  ArrayUnique,
  IsArray,
  IsNotEmpty,
  IsString,
} from "class-validator";

export class CreateTeamDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  description: string;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  @ArrayMinSize(2)
  @ArrayMaxSize(3)
  @ArrayUnique()
  @ApiProperty({ type: [String], minItems: 2, maxItems: 3 })
  students: string[];

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  schoolId: string;
}
