import { Test, TestingModule } from '@nestjs/testing';
import { WellbeingMomentsService } from './wellbeing-moments.service';

describe('WellbeingMomentsService', () => {
  let service: WellbeingMomentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WellbeingMomentsService],
    }).compile();

    service = module.get<WellbeingMomentsService>(WellbeingMomentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
