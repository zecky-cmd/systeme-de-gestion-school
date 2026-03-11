import { Test, TestingModule } from '@nestjs/testing';
import { MatiereNiveauController } from './matiere-niveau.controller';

describe('MatiereNiveauController', () => {
  let controller: MatiereNiveauController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MatiereNiveauController],
    }).compile();

    controller = module.get<MatiereNiveauController>(MatiereNiveauController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
