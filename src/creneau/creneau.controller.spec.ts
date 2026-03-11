import { Test, TestingModule } from '@nestjs/testing';
import { CreneauController } from './creneau.controller';

describe('CreneauController', () => {
  let controller: CreneauController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreneauController],
    }).compile();

    controller = module.get<CreneauController>(CreneauController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
