import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor() {}

  async create() {
    try {
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  async findAll() {
    try {
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  async findOne() {
    try {
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  async update() {
    try {
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  async remove() {
    try {
    } catch (error) {
      throw new RpcException(error.message);
    }
  }
}