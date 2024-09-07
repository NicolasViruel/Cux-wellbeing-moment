import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";


@Schema()
export class WellbeingMoments extends Document{

    @Prop({ required: true})
    type: string;

    @Prop({ required: true})
    description: string;

    @Prop({default: Date.now})
    createdAt: Date
    
    @Prop({ default: null })
    scheduleAt: Date


}

export const WellbeingMomentSchema = SchemaFactory.createForClass(WellbeingMoments);