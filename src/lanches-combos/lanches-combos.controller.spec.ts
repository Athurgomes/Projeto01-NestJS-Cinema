import { Test, TestingModule } from '@nestjs/testing';
import { LanchesCombosController } from './lanches-combos.controller';
import { LanchesCombosService } from './lanches-combos.service';

describe('LanchesCombosController', () => {
  let controller: LanchesCombosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LanchesCombosController],
      providers: [LanchesCombosService],
    }).compile();

    controller = module.get<LanchesCombosController>(LanchesCombosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
