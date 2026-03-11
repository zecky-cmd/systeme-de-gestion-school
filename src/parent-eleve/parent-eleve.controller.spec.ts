import { Test, TestingModule } from '@nestjs/testing';
import { ParentEleveController } from './parent-eleve.controller';

describe('ParentEleveController', () => {
  let controller: ParentEleveController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParentEleveController],
    }).compile();

    controller = module.get<ParentEleveController>(ParentEleveController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
