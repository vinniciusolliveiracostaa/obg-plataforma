import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy, RpcException } from "@nestjs/microservices";
import { createId } from "@paralleldrive/cuid2";
import { CreateSchoolDto } from "@repo/dtos/index";
import { School } from "@repo/entities/index";
import { lastValueFrom } from "rxjs";



@Injectable()
export class UserCreateSchoolService {
    constructor(
        @Inject('SCHOOLS_CONSUMER') private natsClient: ClientProxy
    ) {}

    async create(createSchoolDto: CreateSchoolDto): Promise<School> {
     try {
        const school = await lastValueFrom(this.natsClient.send({cmd:'create.school'}, createSchoolDto));
        return school;
     } catch (error) {
        throw new RpcException(error.message);
     }
    }

    /*async create(createSchoolDto: CreateSchoolDto): Promise<School> {
        try {
            if (!createSchoolDto.inep) {
                throw new RpcException('Missing inep');
            }

            const existingSchool = await this.usersRepository.findOne({
                where: { inep: createSchoolDto.inep },
            });

            if (existingSchool) {
                throw new RpcException('Inep already exists');
            }

            const school = new School({
                ...createSchoolDto,
                id: createId(),
            });
        }
    }*/
}