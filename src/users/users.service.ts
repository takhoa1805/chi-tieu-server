import { Injectable } from '@nestjs/common';
import {InjectModel,InjectConnection} from '@nestjs/mongoose';
import {User} from '../schemas/user.schema';
import {Model, Connection} from 'mongoose';

@Injectable()
export class UsersService {

  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
  ){

  }



  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  // findAll() {
  //   return 'Hello from user';
  // }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }


  
  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
