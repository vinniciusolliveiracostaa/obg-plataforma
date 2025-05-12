import { Controller } from '@nestjs/common';
import { StudentsService } from './students.service';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @EventPattern('createdUser')
  async create(@Payload() data: any) {
    console.log(data);
  }
}
