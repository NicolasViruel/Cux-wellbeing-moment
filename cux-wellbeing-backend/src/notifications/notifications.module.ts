import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { UsersModule } from 'src/users/users.module';
import { WellbeingMomentsModule } from 'src/wellbeing-moments/wellbeing-moments.module';
import { NotificationsService } from './notifications.service';


@Module({
    imports: [ScheduleModule.forRoot(),
        UsersModule,
        WellbeingMomentsModule],
    providers: [NotificationsService],
    exports: [NotificationsService],
})
export class NotificationsModule {}
