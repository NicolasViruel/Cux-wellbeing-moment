import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserCUX, UserSchema } from './user.schema';
import { WellbeingMomentsModule } from 'src/wellbeing-moments/wellbeing-moments.module';

@Module({
  imports:[MongooseModule.forFeature([{name: UserCUX.name, schema: UserSchema}]),
  WellbeingMomentsModule, //traigo el modelo para que pueda utilizarlo en el servicio
],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
