import { Test, TestingModule } from '@nestjs/testing';
import { WellbeingMomentsController } from './wellbeing-moments.controller';

describe('WellbeingMomentsController', () => {
  let controller: WellbeingMomentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WellbeingMomentsController],
    }).compile();

    controller = module.get<WellbeingMomentsController>(WellbeingMomentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
