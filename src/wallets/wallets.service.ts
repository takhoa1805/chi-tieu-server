import { Injectable } from '@nestjs/common';
import {InjectModel,InjectConnection} from '@nestjs/mongoose';
import {Wallet} from '../schemas/wallet.schema';
import {Model, Connection} from 'mongoose';


@Injectable()
export class WalletsService {
  constructor(
    @InjectModel(Wallet.name) private walletModel: Model<Wallet>,
){

  }


  async findAll(): Promise<Wallet[]> {
    return await this.walletModel.find().exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} wallet`;
  }


  remove(id: number) {
    return `This action removes a #${id} wallet`;
  }
}
