import { Test, TestingModule } from '@nestjs/testing';
import { WalletController } from './wallet.controller';

describe('Wallet Controller', () => {
  let module: TestingModule;
  
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [WalletController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: WalletController = module.get<WalletController>(WalletController);
    expect(controller).toBeDefined();
  });
});
