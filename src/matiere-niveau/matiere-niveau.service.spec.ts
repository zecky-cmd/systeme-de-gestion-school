import { Test, TestingModule } from '@nestjs/testing';
import { MatiereNiveauService } from './matiere-niveau.service';

describe('MatiereNiveauService', () => {
  let service: MatiereNiveauService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MatiereNiveauService],
    }).compile();

    service = module.get<MatiereNiveauService>(MatiereNiveauService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
