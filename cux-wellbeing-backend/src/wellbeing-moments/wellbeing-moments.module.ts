import { Module } from '@nestjs/common';
import { WellbeingMomentsService } from './wellbeing-moments.service';
import { WellbeingMomentsController } from './wellbeing-moments.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { WellbeingMoments, WellbeingMomentSchema } from './wellbeing-moment.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: WellbeingMoments.name, schema: WellbeingMomentSchema}]),],
  
  providers: [WellbeingMomentsService],
  controllers: [WellbeingMomentsController],
  exports: [WellbeingMomentsService, MongooseModule],
})
export class WellbeingMomentsModule {}
