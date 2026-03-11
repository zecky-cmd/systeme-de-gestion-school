import { Test, TestingModule } from '@nestjs/testing';
import { ParentEleveService } from './parent-eleve.service';

describe('ParentEleveService', () => {
  let service: ParentEleveService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParentEleveService],
    }).compile();

    service = module.get<ParentEleveService>(ParentEleveService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
