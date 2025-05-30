import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { StudentUserDto, UpdateStudentUserDto } from '@obg/schemas';

@Injectable()
export class AppService {
  constructor() {}

  async create(studentUserDto: StudentUserDto) {
    try {
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  async findAll(page: number, pageSize: number) {
    try {
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  async findOne(id: string) {
    try {
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  async update(id: string, updateStudentUserDto: UpdateStudentUserDto) {
    try {
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  async remove(id: string) {
    try {
    } catch (error) {
      throw new RpcException(error.message);
    }
  }
}