import { Test, TestingModule } from '@nestjs/testing';
import { EtablissementConfigController } from './etablissement_config.controller';

describe('EtablissementConfigController', () => {
  let controller: EtablissementConfigController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EtablissementConfigController],
    }).compile();

    controller = module.get<EtablissementConfigController>(EtablissementConfigController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
