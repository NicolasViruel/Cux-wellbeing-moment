// import { BadRequestException, Body, Controller, Get, Post } from '@nestjs/common';
// import { WellbeingMomentsService } from './wellbeing-moments.service';

// @Controller('wellbeing-moments')
// export class WellbeingMomentsController {
//     constructor(private readonly momentsService: WellbeingMomentsService) {}

//     @Post('create')
//     async createMoment(
//         @Body('type') type: string,
//         @Body('description') description: string,
//         @Body('scheduledAt') scheduledAt: string,
//     ) {
//         // Convertir la fecha a un objeto Date
//         const date = new Date(scheduledAt);

//         // Verificar si la fecha es valida
//         if (isNaN(date.getTime())) {
//             throw new BadRequestException('La fecha proporcionada no es válida.');
//         }

//         return this.momentsService.createMoment(type, description, date);
//     }

//     @Get()
//     async findAll(){
//         return this.momentsService.findAll()
//     }



// }


import { BadRequestException, Body, Controller, Get, Post } from '@nestjs/common';
import { WellbeingMomentsService } from './wellbeing-moments.service';

@Controller('wellbeing-moments')
export class WellbeingMomentsController {
  constructor(private readonly momentsService: WellbeingMomentsService) {}

  @Post('create')
  async createMoment(
    @Body('type') type: string,
    @Body('description') description: string,
    @Body('scheduledAt') scheduledAt: string, // Recibimos la fecha como string
  ) {
    // Convertir la fecha a un objeto Date en UTC
    const date = new Date(scheduledAt);
    
    if (isNaN(date.getTime())) {
      throw new BadRequestException('La fecha proporcionada no es válida.');
    }

    // Ajustar la fecha a UTC añadiendo la diferencia horaria (-3 horas para GMT-3)
    const utcDate = new Date(date.getTime() + 3 * 60 * 60 * 1000);

    return this.momentsService.createMoment(type, description, utcDate);
  }

  @Get()
  async findAll() {
    return this.momentsService.findAll();
  }
}

