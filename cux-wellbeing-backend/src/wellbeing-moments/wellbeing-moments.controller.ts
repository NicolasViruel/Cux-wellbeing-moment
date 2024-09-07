import { Body, Controller, Get, Post } from '@nestjs/common';
import { WellbeingMomentsService } from './wellbeing-moments.service';

@Controller('wellbeing-moments')
export class WellbeingMomentsController {
    constructor(private readonly momentsService: WellbeingMomentsService) {}

    @Post('create')
    async createMoment(
        @Body('type') type: string,
        @Body('description') description: string,
        @Body('scheduleAt') scheduleAt?: Date,
    ) {
        return this.momentsService.createMoment(type, description, scheduleAt);
    }

    @Get()
    async findAll(){
        return this.momentsService.findAll()
    }



}
