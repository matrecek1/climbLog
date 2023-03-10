import { Body, Controller, Post, Get, Patch, Delete, Param, ParseIntPipe } from '@nestjs/common';
import { ClimbersService } from './climbers.service';
import { ClimberUpdateDto, CreateClimberDto } from './climbers.types';

@Controller('climbers')
export class ClimbersController {
    constructor(private climbersService: ClimbersService) { }
    @Post()
    async addClimber(@Body('climberInput') climberInput: CreateClimberDto) {
        const climber = await this.climbersService.insert(climberInput)
        return { message: "Climber created!", climber }
    }

    @Get()
    async getClimbers() {
        const climbers = await this.climbersService.findAll()
        return { climbers }
    }

    @Get(':id')
    async getClimber(@Param('id', ParseIntPipe) climberId: number) {
        const climber = await this.climbersService.findOne(climberId)
        return { climber }
    }

    @Patch(':id')
    async patchClimber(@Param('id', ParseIntPipe) climberId: number,
        @Body('climberUpdateInput') climberUpdate: ClimberUpdateDto) {
        const updatedClimber = await this.climbersService.patch(climberId, climberUpdate)
        return {message:"Climber Updated!", updatedClimber}
    }

    @Delete(':id')
    async deleteClimber(@Param('id', ParseIntPipe) climberId:number){
        await this.climbersService.remove(climberId)
        return {message:"Climber deleted!"}
    }
}
