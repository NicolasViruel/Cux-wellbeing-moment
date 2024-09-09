// import { Injectable } from '@nestjs/common';
// import { Cron, CronExpression } from '@nestjs/schedule';
// import { UsersService } from '../users/users.service';
// import { WellbeingMomentsService } from '../wellbeing-moments/wellbeing-moments.service';
// import * as nodemailer from 'nodemailer';

// @Injectable()
// export class NotificationsService {

//   private transporter: nodemailer.Transporter;

//   constructor(
//     private readonly usersService: UsersService,
//     private readonly momentsService: WellbeingMomentsService,
//   ) {
//     //configuro el transportador
//     this.transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS
//       },
//     });
//     // Verificación de conexión SMTP
//     this.transporter.verify((error, success) => {
//       if (error) {
//         console.log('Error de conexión con el servidor de correo:', error);
//       } else {
//         console.log('Servidor de correo listo para enviar mensajes');
//       }
//     });
//   }

//   @Cron('*/10 * * * * *') // Cada 10 segundos para pruebas rápidas
//   // async notifyUsers() {
//   //   console.log('Iniciando verificación de micro-momentos para enviar notificaciones...');

//   //   const users = await this.usersService.findAll();
//   //   const now = new Date();
//   //   console.log(`Usuarios encontrados: ${users.length}`);

//   //   for (const user of users) {
//   //     console.log(`Verificando micro-momentos para el usuario: ${user.email}`);
//   //     user.wellbeingMoments.forEach((moment: any) => {
//   //       const momentDate = moment.scheduledAt instanceof Date ? moment.scheduledAt : new Date(moment.scheduledAt);  // Asegurar que sea un objeto `Date`
//   //       console.log(`Verificando momento agendado para: ${momentDate}`);

//   //       if (momentDate.getTime() - now.getTime() <= 10 * 1000 && momentDate > now) {
//   //         console.log(`Enviando notificación para el micro-momento: ${moment.type}`);
//   //         this.sendNotification(user.email, moment);
//   //       }
//   //     });
//   //   }
//   // }
//   async notifyUsers() {
//     console.log('Iniciando verificación de micro-momentos para enviar notificaciones...');
  
//     const users = await this.usersService.findAll();
//     const now = new Date();
//     console.log(`Usuarios encontrados: ${users.length}`);
  
//     for (const user of users) {
//       console.log(`Verificando micro-momentos para el usuario: ${user.email}`);
  
//       for (const moment of user.wellbeingMoments) {
//         const momentDate = moment.scheduledAt instanceof Date ? moment.scheduledAt : new Date(moment.scheduledAt);  // Asegurar que sea un objeto `Date`
//         console.log(`Verificando momento agendado para: ${momentDate}`);
  
//         if (!isNaN(momentDate.getTime()) && momentDate.getTime() - now.getTime() <= 10 * 1000 && momentDate > now) {
//           console.log(`Enviando notificación para el micro-momento: ${moment.type}`);
//           await this.sendNotification(user.email, moment);
//         } else {
//           console.log('No se encontraron micro-momentos próximos a ejecutar.');
//         }
//       }
//     }
//   }

//   private async sendNotification(email: string, moment: any) {
//     const mailOptions = {
//       from: process.env.EMAIL_USER,
//       to: email,
//       subject: `Recordatorio de Micro-Momento: ${moment.type}`,
//       text: `Hola! es hora de un micro-momento: ${moment.description}`,
//     };

//     try {
//       const info = await this.transporter.sendMail(mailOptions);
//       console.log(`Correo enviado: ${info.response}`);
//     } catch (error) {
//       console.log(`Error al enviar el correo: ${error.message}`);
//     }
//   }

// }


import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { UsersService } from '../users/users.service';
import * as nodemailer from 'nodemailer';
import { WellbeingMoments } from 'src/wellbeing-moments/wellbeing-moment.schema';

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

  @Cron('*/10 * * * * *') // Cada 10 segundos para pruebas rápidas
  async notifyUsers() {
    console.log('Iniciando verificación de micro-momentos para enviar notificaciones...');

    const users = await this.usersService.findAll();
    const now = new Date();
    console.log(`Usuarios encontrados: ${users.length}`);

    for (const user of users) {
      console.log(`Verificando micro-momentos para el usuario: ${user.email}`);

      
      for (const moment of user.wellbeingMoments as any) {
        console.log(`Fecha original en MongoDB: ${moment.scheduledAt}`);

        const momentDate = new Date(moment.scheduledAt);

        console.log(`Verificando momento agendado para: ${momentDate}`);
        const timeDifference = momentDate.getTime() - now.getTime(); //Verifico la diferencia horaria
        // if (!isNaN(momentDate.getTime()) && momentDate.getTime() - now.getTime() <= 10 * 1000 && momentDate > now) {
        //   console.log(`Enviando notificación para el micro-momento: ${moment.type}`);
        //   await this.sendNotification(user.email, moment);
        if (!isNaN(momentDate.getTime()) && timeDifference > 0 && timeDifference <= 120 * 1000) {
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




