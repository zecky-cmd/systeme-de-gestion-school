import { Test, TestingModule } from '@nestjs/testing';
import { RubriqueFinanciereService } from './rubrique-financiere.service';

describe('RubriqueFinanciereService', () => {
  let service: RubriqueFinanciereService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RubriqueFinanciereService],
    }).compile();

    service = module.get<RubriqueFinanciereService>(RubriqueFinanciereService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
