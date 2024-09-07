import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";


@Schema()
export class UserCUX extends Document {
    @Prop({ required: true})
    name: string;

    @Prop({ required: true, unique: true})
    email: string;

    @Prop({ required: true})
    password: string;

    @Prop({ default: [], type: [{ type: Types.ObjectId, ref: 'WellbeingMoment'}] })
    wellbeingMoments: Types.ObjectId[]; //aca almacenamos los dis de los micro-momentos
    
}

export const UserSchema = SchemaFactory.createForClass(UserCUX);