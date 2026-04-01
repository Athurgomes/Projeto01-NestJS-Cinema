import { Test, TestingModule } from '@nestjs/testing';
import { LanchesCombosService } from './lanches-combos.service';

describe('LanchesCombosService', () => {
  let service: LanchesCombosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LanchesCombosService],
    }).compile();

    service = module.get<LanchesCombosService>(LanchesCombosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
