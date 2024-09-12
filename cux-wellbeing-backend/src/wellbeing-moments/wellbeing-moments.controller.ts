
import { BadRequestException, Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
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

    // Almacena la fecha tal cual esta (en UTC)
  return this.momentsService.createMoment(type, description, date);
  }

  @Get()
  async findAll() {
    return this.momentsService.findAll();
  }

  @Delete(':id')
  async deleteMoment(@Param('id') id: string){
    return this.momentsService.deleteMoment(id);
  }
}

