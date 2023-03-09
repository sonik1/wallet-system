import { Test, TestingModule } from '@nestjs/testing';
import { WalletService } from './wallet.service';

describe('BlogService', () => {
  let service: WalletService;
  
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WalletService],
    }).compile();
    service = module.get<WalletService>(WalletService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
