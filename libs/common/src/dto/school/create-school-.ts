import { IsEnum, IsNumber, IsString } from "class-validator";
import { CreateUserDto } from "../user/create-user.dto";
import { Location, AdmCategory, AdmDependency } from "src/entities/school/school.entity";

export class CreateSchoolDto extends CreateUserDto {
    @IsString()
    inepCode: string;

    @IsString()
    ufCode: string;

    @IsString()
    city: string;

    @IsEnum(Location)
    location: Location;

    @IsEnum(AdmCategory)
    admCategory: AdmCategory;

    @IsEnum(AdmDependency)
    admDependency: AdmDependency;

    @IsString()
    serviceRestriction: string;

    @IsString()
    address: string;

    @IsString()
    locality: string;

    @IsString()
    privCategory: string;

    @IsString()
    publicAuthorityPartner: string;

    @IsString()
    regulation: string;

    @IsString()
    carry: string;

    @IsString()
    teachingStageModality: string;

    @IsString()
    otherOffers: string;

    @IsNumber()
    latitude: string;

    @IsNumber()
    longitude: string;
}
