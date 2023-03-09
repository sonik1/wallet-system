import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { wallet } from './interfaces/wallet.interface';
import { transaction } from './interfaces/transaction.interface';
import { CreatePostDTO } from './dto/create-post.dto';
import { Mongoose } from 'mongoose';
@Injectable()
export class WalletService {

    constructor(@InjectModel('Wallet') private readonly walletModel: Model<wallet>, @InjectModel('Transaction') private readonly transactionModel: Model<transaction>) { }

    async getPosts(): Promise<wallet[]> {
        const posts = await this.walletModel.find().exec();
        return posts;
    }

    async getWalletDetails(walletId): Promise<any> {
        const post = await this.walletModel
            .findById(walletId)
            .exec();
        const allRecords = await this.transactionModel.find({ "walletId": (walletId) });

        let creditBalance = 0, debitBalance = 0;
        allRecords.map((item) => {
            if (item.type == 'credit') {
                creditBalance = creditBalance + parseFloat(item.balance)
            } else if (item.type == 'debit') {
                debitBalance = debitBalance + parseFloat(item.balance)
            }
        })

        let totalBalance = creditBalance - debitBalance;

        return {
            walletDetails: post,
            balance: totalBalance.toFixed(4)
        };
    }

    async setupWallet(createPostDTO: CreatePostDTO): Promise<any> {
        const newPost = await this.walletModel(createPostDTO).save();
        let txnObj = {
            walletId: newPost._id,
            date_posted: new Date(),
            balance: createPostDTO.balance,
            type: 'credit'
        }
        const newTxn = await this.transactionModel(txnObj).save();
        let txn = {
            'wallet': newPost,
            'transaction': newTxn
        }
        return txn;
    }

    async transactWallet(walletId, createPostDTO: CreatePostDTO): Promise<any> {   
        let saveTxn = await this.transactionModel(createPostDTO).save();
        const allRecords = await this.transactionModel.find({"walletId":(walletId)});

        let creditBalance=0, debitBalance=0;
        allRecords.map((item)=>{
            if(item.type == 'credit'){
                creditBalance = creditBalance + parseFloat(item.balance)
            } else if(item.type == 'debit'){
                debitBalance = debitBalance + parseFloat(item.balance)
            }
        })

        let totalBalance = creditBalance - debitBalance;

        return {
            transactionId: saveTxn._id,
            balance: totalBalance.toFixed(4)
        };
    }

    async getTransactions(walletId, skip, limit): Promise<any> {   
        return this.transactionModel.find({"walletId":(walletId)}).
        skip(parseInt(skip)).
        limit(parseInt(limit))
    }

    async deletePost(postID): Promise<any> {
        const deletedPost = await this.walletModel
            .findByIdAndRemove(postID);
        return deletedPost;
    }

}
