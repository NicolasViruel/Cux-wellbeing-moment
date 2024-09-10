import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { UsersService } from '../users/users.service';
import * as nodemailer from 'nodemailer';
import { WellbeingMoments } from '../wellbeing-moments/wellbeing-moment.schema'; 

@Injectable()
export class NotificationsService {
  private transporter: nodemailer.Transporter;

  constructor(
    private readonly usersService: UsersService,
  ) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    this.transporter.verify((error, success) => {
      if (error) {
        console.log('Error de conexión con el servidor de correo:', error);
      } else {
        console.log('Servidor de correo listo para enviar mensajes');
      }
    });
  }

  @Cron('0 * * * * *') // Ejecuta cada minuto
  async notifyUsers() {
    console.log('Iniciando verificación de micro-momentos para enviar notificaciones...');

    const users = await this.usersService.findAll();
    const now = new Date(); // Hora actual en UTC
    console.log(`Usuarios encontrados: ${users.length}`);

    for (const user of users) {
      console.log(`Verificando micro-momentos para el usuario: ${user.email}`);

      for (const moment of user.wellbeingMoments as any) {
        console.log(`Fecha original en MongoDB: ${moment.scheduledAt}`);

        const momentDate = new Date(moment.scheduledAt);

        console.log(`Verificando momento agendado para: ${momentDate}`);

        // Verifica si el micro-momento esta cerca de 1 minuto
        const timeDifference = momentDate.getTime() - now.getTime();
        if (!isNaN(momentDate.getTime()) && timeDifference >= 0 && timeDifference <= 60 * 1000) {
          console.log(`Enviando notificación para el micro-momento: ${moment.type}`);
          await this.sendNotification(user.email, moment);
        } else {
          console.log('No se encontraron micro-momentos próximos a ejecutar.');
        }
      }
    }
  }

  private async sendNotification(email: string, moment: WellbeingMoments) {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Recordatorio de Micro-Momento: ${moment.type}`,
      text: `Hola! es hora de un micro-momento: ${moment.description}`,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log(`Correo enviado: ${info.response}`);
    } catch (error) {
      console.log(`Error al enviar el correo: ${error.message}`);
    }
  }
}






