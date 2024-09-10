
import { BadRequestException, Body, Controller, Get, Post } from '@nestjs/common';
import { WellbeingMomentsService } from './wellbeing-moments.service';

@Controller('wellbeing-moments')
export class WellbeingMomentsController {
  constructor(private readonly momentsService: WellbeingMomentsService) {}

  @Post('create')
  async createMoment(
    @Body('type') type: string,
    @Body('description') description: string,
    @Body('scheduledAt') scheduledAt: string,
  ) {
    // convertir la fecha a un objeto Date en UTC
    const date = new Date(scheduledAt);
    
    if (isNaN(date.getTime())) {
      throw new BadRequestException('La fecha proporcionada no es válida.');
    }

    // la fecha con la diferencia horaria (-3 horas)
    const utcDate = new Date(date.getTime() + 3 * 60 * 60 * 1000);

    return this.momentsService.createMoment(type, description, utcDate);
  }

  @Get()
  async findAll() {
    return this.momentsService.findAll();
  }
}

