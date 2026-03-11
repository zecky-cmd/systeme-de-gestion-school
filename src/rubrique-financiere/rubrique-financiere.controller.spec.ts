import { Test, TestingModule } from '@nestjs/testing';
import { RubriqueFinanciereController } from './rubrique-financiere.controller';

describe('RubriqueFinanciereController', () => {
  let controller: RubriqueFinanciereController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RubriqueFinanciereController],
    }).compile();

    controller = module.get<RubriqueFinanciereController>(RubriqueFinanciereController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
