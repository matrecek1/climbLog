import { Body, Controller, Post, Get, Param, ParseIntPipe, Patch, Delete } from '@nestjs/common';
import { ClimbLogsService } from './climb-logs.service';
import { climbLogUpdateDto, createClimbLogDto } from './climb-logs.types';

@Controller('climb-logs')
export class ClimbLogsController {
    constructor(private climbLogsService:ClimbLogsService) {}
    @Post()
    async addClimbLog(@Body('climbLogInput') climbLogInput:createClimbLogDto){
        const newClimbLog = await this.climbLogsService.insert(climbLogInput.boulderId, climbLogInput.climberId)
        return {message:"Climb Log created!", newClimbLog}
    }

    @Get()
    async getClimbLogs(){
        const climbLogs = await this.climbLogsService.findAll()
        return {climbLogs}
    }

    @Get(':id')
    async getClimbLog(@Param('id', ParseIntPipe) climbLogId:number){
        const climbLog = await this.climbLogsService.findOne(climbLogId)
        return {climbLog}
    }

    @Patch(':id')
    async updateClimbLog(@Param('id', ParseIntPipe) climbLogId:number,
    @Body('climbLogUpdateInput') update:climbLogUpdateDto){
        const updatedBoulder = await this.climbLogsService.patch(climbLogId, update)
        return {message:"Boulder successfully updated!", updatedBoulder}
    }

    @Delete(':id')
    async deleteClimbLog(@Param('id', ParseIntPipe) climbLogId:number){
        await this.climbLogsService.remove(climbLogId)
        return {message:"Boulder deleted!"}
    }
}
