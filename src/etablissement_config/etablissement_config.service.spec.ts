import { Test, TestingModule } from '@nestjs/testing';
import { EtablissementConfigService } from './etablissement_config.service';

describe('EtablissementConfigService', () => {
  let service: EtablissementConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EtablissementConfigService],
    }).compile();

    service = module.get<EtablissementConfigService>(EtablissementConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
