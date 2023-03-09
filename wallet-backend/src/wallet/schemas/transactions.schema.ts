import { Document, Types, Schema as MongooseSchema } from 'mongoose';

export const TransactionSchema = new MongooseSchema({
    walletId: { type: MongooseSchema.Types.ObjectId , ref: 'wallet' },
    type: String,
    body: String,
    author: String,
    date_posted: String,
    balance: String
})