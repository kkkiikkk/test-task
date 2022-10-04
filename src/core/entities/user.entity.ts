// Core
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({
    timestamps: {
        createdAt: true,
        updatedAt: false,
    },
    versionKey: false,
    _id: false
})
export class User {
    @Prop({ required: true, type: Types.ObjectId })
    _id: string

    @Prop({ required: false })
    balance: number;
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);
