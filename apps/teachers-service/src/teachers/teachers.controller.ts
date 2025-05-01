import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TeachersService } from './teachers.service';

// noinspection ES6PreferShortImport
import { CreateTeacherDto, UpdateTeacherDto } from '@repo/dtos/index';

@Controller()
export class TeachersController {
  constructor(private readonly teachersService: TeachersService) {}

  @MessagePattern('createTeacher')
  create(@Payload() createTeacherDto: CreateTeacherDto) {
    return this.teachersService.create(createTeacherDto);
  }

  @MessagePattern('findAllTeachers')
  findAll() {
    return this.teachersService.findAll();
  }

  @MessagePattern('findOneTeacher')
  findOne(@Payload() id: string) {
    return this.teachersService.findOne(id);
  }

  @MessagePattern('updateTeacher')
  update(
    @Payload() payload: { id: string; updateTeacherDto: UpdateTeacherDto },
  ) {
    return this.teachersService.update(payload.id, payload.updateTeacherDto);
  }

  @MessagePattern('removeTeacher')
  remove(@Payload() id: string) {
    return this.teachersService.remove(id);
  }
}
