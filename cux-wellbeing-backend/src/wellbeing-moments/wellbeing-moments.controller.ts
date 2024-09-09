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
        // Convertir la fecha a un objeto Date
        const date = new Date(scheduledAt);

        // Verificar si la fecha es válida
        if (isNaN(date.getTime())) {
            throw new BadRequestException('La fecha proporcionada no es válida.');
        }

        return this.momentsService.createMoment(type, description, date);
    }

    @Get()
    async findAll(){
        return this.momentsService.findAll()
    }



}
