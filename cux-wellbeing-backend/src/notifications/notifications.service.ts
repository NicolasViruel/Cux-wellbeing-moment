import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { UsersService } from '../users/users.service';
import { WellbeingMomentsService } from '../wellbeing-moments/wellbeing-moments.service';

@Injectable()
export class NotificationsService {
  constructor(
    private readonly usersService: UsersService,
    private readonly momentsService: WellbeingMomentsService,
  ) {}

  // Tarea programada para verificar los micro-momentos cada minuto
  @Cron(CronExpression.EVERY_MINUTE)
  async notifyUsers() {
    const users = await this.usersService.findAll();
    const now = new Date();

    for (const user of users) {
      user.wellbeingMoments.forEach((moment: any) => {
        const momentDate = new Date(moment.scheduledAt);
        if (momentDate.getTime() - now.getTime() <= 60 * 1000 && momentDate > now) {
          this.sendNotification(user.email, moment);
        }
      });
    }
  }

  // Método para enviar una notificación
  private sendNotification(email: string, moment: any) {
    console.log(`Enviando notificación a ${email} sobre el micro-momento: ${moment.type}`);
    // Aquí podrías integrar una solución de notificación real como un email o push notification.
  }
}

