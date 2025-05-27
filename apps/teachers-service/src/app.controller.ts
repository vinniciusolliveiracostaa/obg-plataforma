import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, RpcException } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('createdUser')
  async create() {
    try {
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @EventPattern('findAllStudents')
  async findAll() {
    try {
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @EventPattern('findOneStudent')
  async findOne() {
    try {
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @EventPattern('updatedUser')
  async update() {
    try {
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @EventPattern('removedUser')
  async remove() {
    try {
    } catch (error) {
      throw new RpcException(error.message);
    }
  }
}