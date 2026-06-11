import { Test, TestingModule } from '@nestjs/testing';
import { TiketService } from './tiket.service';

describe('TiketService', () => {
  let service: TiketService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TiketService],
    }).compile();

    service = module.get<TiketService>(TiketService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
