import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private readonly userService: UsersService) {}

    @Post('create')
    async createUser(
        @Body('name') name:string,
        @Body('email') email:string,
        @Body('password') password:string,
    ) {
        return this.userService.createUser(name, email, password);
    }

    @Get()
    async findAll(){
        return this.userService.findAll();
    }

    @Post(':userId/assign-moment/:momentId')
    async assignMomentToUser(
        @Param('userId') userId: string,
        @Param('momentId') momentId: string,
    ) {
        return this.userService.assignMomentToUser(userId, momentId);
        
        
    }



}
