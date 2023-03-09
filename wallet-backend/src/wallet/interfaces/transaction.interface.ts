import { Document, Types, Schema as MongooseSchema } from 'mongoose';

export interface transaction extends Document {
    readonly walletId: { type: MongooseSchema.Types.ObjectId , ref: 'Wallet' };
    readonly date_posted: string
    readonly balance: string;
    readonly type: string;
}