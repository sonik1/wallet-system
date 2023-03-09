import { Module } from '@nestjs/common';
import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';
import { MongooseModule } from '@nestjs/mongoose';
import { WalletSchema } from './schemas/wallet.schema';
import { TransactionSchema } from './schemas/transactions.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Wallet', schema: WalletSchema },
      { name: 'Transaction', schema: TransactionSchema }
    ])
  ],
  controllers: [WalletController],
  providers: [WalletService]
})
export class BlogModule { }