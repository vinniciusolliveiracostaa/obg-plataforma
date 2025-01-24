import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, MaxLength, MinLength } from "class-validator";
import { Location, AdmCategory, AdmDependency } from "../../entities/schools/schools.entity";



export class CreateSchoolDto {
    /*
    @IsNumber()
    @MinLength(8)
    @MaxLength(8)
    @IsNotEmpty()
    inep: number;

    @IsString()
    @MaxLength(2)
    @IsNotEmpty()
    uf: string;

    @IsString()
    @IsNotEmpty()
    city: string;

    @IsEnum(Location)
    @IsNotEmpty()
    location: Location;

    @IsString()
    @IsNotEmpty()
    locality: string;

    @IsEnum(AdmCategory)
    @IsNotEmpty()
    admCategory: AdmCategory;

    @IsString()
    @IsNotEmpty()
    serviceRestriction: string;
    
    @IsString()
    @IsNotEmpty()
    address: string;

    @IsEnum(AdmDependency)
    @IsNotEmpty()
    admDependency: AdmDependency;

    @IsString()
    @IsNotEmpty()
    privCategory: string;

    @IsString()
    @IsNotEmpty()
    publicAuthorityPartner: string;

    @IsString()
    @IsNotEmpty()
    regulation: string;

    @IsString()
    @IsNotEmpty()
    carry: string;

    @IsString()
    @IsNotEmpty()
    teachingStageModality: string;

    @IsString()
    @IsNotEmpty()
    otherOffers: string;

    @IsNumber()
    @IsNotEmpty()
    latitude: number;

    @IsNumber()
    @IsNotEmpty()
    longitude: number;
    */
    @IsUUID()
    @IsOptional()
    userId: string
}

