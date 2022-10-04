// Core
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export enum TYPE_OF_TRANSACTION {
    WITHDRAW = 'withdraw',
    DEPOSIT = 'deposit',
    TRANSFER = 'transfer'
}

@Schema({
    timestamps: {
        createdAt: true,
        updatedAt: false,
    },
    versionKey: false,
})
export class Transaction {
    @Prop({ required: true })
    value: number;

    @Prop({ required: false, type: Types.ObjectId })
    to_userId?: string;

    @Prop({ required: false, type: Types.ObjectId })
    from_userId?: string;

    @Prop({ required: true, enum: TYPE_OF_TRANSACTION })
    type: TYPE_OF_TRANSACTION;

    @Prop({ required: false })
    description?: string;
}

export type TransactionDocument = Transaction & Document;

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
