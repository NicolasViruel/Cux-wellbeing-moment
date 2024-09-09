import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserCUX } from './user.schema';
import { Model, Types } from 'mongoose';
import { WellbeingMoments } from '../wellbeing-moments/wellbeing-moment.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserCUX.name) private userModel: Model<UserCUX>,
    @InjectModel(WellbeingMoments.name) private momentModel: Model<WellbeingMoments>,
  ) {}

  async createUser(name: string, email: string, password: string): Promise<UserCUX> {
    const newUser = new this.userModel({ name, email, password });
    return newUser.save();
  }

  async findAll(): Promise<UserCUX[]> {
    return this.userModel
      .find()
      .populate({
        path: 'wellbeingMoments', // nombre del campo que contiene las referencias
        model: WellbeingMoments.name, // nombre del modelo al que hace referencia
      })
      .exec();
  }

  async findByEmail(email: string): Promise<UserCUX> {
    return this.userModel
      .findOne({ email })
      .populate({
        path: 'wellbeingMoments',
        model: WellbeingMoments.name,
      })
      .exec();
  }

  async assignMomentToUser(userId: string, momentId: string): Promise<UserCUX> {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new Error(`Usuario con ID ${userId} no encontrado`);
    }

    const moment = await this.momentModel.findById(momentId);
    if (!moment) {
      throw new Error(`Micro-momento con ID ${momentId} no encontrado`);
    }

    user.wellbeingMoments.push(new Types.ObjectId(momentId));
    return user.save();
  }
}


