import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { WellbeingMoments } from "src/wellbeing-moments/wellbeing-moment.schema";


@Schema()
export class UserCUX extends Document {
    @Prop({ required: true})
    name: string;

    @Prop({ required: true, unique: true})
    email: string;

    @Prop({ required: true})
    password: string;

    @Prop({ type: [{ type: Types.ObjectId, ref: WellbeingMoments.name }], default: [] })
    wellbeingMoments: Types.ObjectId[];
    
}

export const UserSchema = SchemaFactory.createForClass(UserCUX);