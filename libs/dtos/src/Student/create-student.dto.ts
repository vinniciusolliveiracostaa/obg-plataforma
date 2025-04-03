import { ApiProperty, IntersectionType } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { CreateUserDto } from "../User/create-user.dto";

export class CreateStudentDto extends IntersectionType(CreateUserDto) {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  schoolId: string;
}
