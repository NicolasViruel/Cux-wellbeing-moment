import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { WellbeingMoments } from './wellbeing-moment.schema';
import { Model } from 'mongoose';

@Injectable()
export class WellbeingMomentsService {

    constructor(@InjectModel(WellbeingMoments.name) private modelMoment: Model<WellbeingMoments>) {}

    async createMoment(type: string, description: string, scheduleAt?: Date): Promise<WellbeingMoments>{
        const newMoment = new this.modelMoment({ type, description, scheduleAt})        
        return newMoment.save();
    }

    async findAll(): Promise<WellbeingMoments[]>{
        return this.modelMoment.find().exec();
    }


}
