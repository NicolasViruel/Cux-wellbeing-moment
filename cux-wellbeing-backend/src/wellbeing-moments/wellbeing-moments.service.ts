import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { WellbeingMoments } from './wellbeing-moment.schema';
import { Model } from 'mongoose';

@Injectable()
export class WellbeingMomentsService {

    constructor(@InjectModel(WellbeingMoments.name) private modelMoment: Model<WellbeingMoments>) {}

    async createMoment(type: string, description: string, scheduledAt?: Date): Promise<WellbeingMoments>{
        // Verifica que `scheduledAt` sea una instancia de Date
        const date = scheduledAt instanceof Date && !isNaN(scheduledAt.getTime()) ? scheduledAt : null;

        const newMoment = new this.modelMoment({ type, description, scheduledAt: date})        
        return newMoment.save();
    }

    async findAll(): Promise<WellbeingMoments[]>{
        return this.modelMoment.find().exec();
    }


}
