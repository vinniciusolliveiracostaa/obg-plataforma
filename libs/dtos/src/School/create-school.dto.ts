import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSchoolDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  inep: string;

  @IsString()
  @IsNotEmpty()
  uf: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  location: string;

  @IsString()
  locality: string;

  @IsString()
  administrativecategory: string;

  @IsString()
  servicerestriction: string;

  @IsString()
  address: string;

  @IsString()
  phone: string;

  @IsString()
  administrativedependence: string;

  @IsString()
  privatecategory: string;

  @IsString()
  publicpoweragreement: string;

  @IsString()
  regulation: string;

  @IsString()
  size: string;

  @IsString()
  teachingmodalitystage: string;

  @IsString()
  otheroffers: string;

  @IsString()
  latitude: string;

  @IsString()
  longitude: string;
}
