import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TransactionDocument = HydratedDocument<Transaction>;

@Schema()
export class Transaction{
    @Prop()
    wallet: string

    @Prop()
    amount: number;

    @Prop()
    detail: string;

    @Prop()
    time: Date;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);