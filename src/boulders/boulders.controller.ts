import { Body, Controller, Get, NotFoundException, Param, Post, Patch, Delete, ParseIntPipe } from '@nestjs/common';
import { BouldersService } from './boulders.service';
import { Grade, BoulderUpdateDto, CreateBoulderDto } from './boulders.types';

@Controller('boulders')
export class BouldersController {
    constructor(private bouldersService:BouldersService){}
    @Post()
    addBoulder(@Body('boulderInput') boulderInput:CreateBoulderDto):{message:string} {
        this.bouldersService.insert(boulderInput)
        return { message: "successfully created Boulder" }
    }

    @Get()
    async getBoulders(){
        const boulders = await this.bouldersService.findAll()
        return {boulders: boulders}
    }

    @Get(':id')
    async getBoulder(@Param('id', ParseIntPipe) boulderId: number){
        const boulder = await this.bouldersService.findOne(boulderId)
        return {boulder}
    }

    @Patch(':id')
    async patchBoulder(@Param('id', ParseIntPipe) boulderId: number,
        @Body('boulderUpdateInput') boulderUpdateInput: BoulderUpdateDto
        ){
        const updatedBoulder = await this.bouldersService.patch(boulderId, boulderUpdateInput)
        return {message:"Boulder update successfull!", updatedBoulder}
    }

    @Delete(':id')
    async deleteBoulder(@Param('id', ParseIntPipe) boulderId:number){
        await this.bouldersService.remove(boulderId)
        return {message: "Boulder deletion successfull!"}
    }
}
