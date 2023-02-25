import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Boulder } from '../boulders/boulders.entity';
import { BouldersService } from '../boulders/boulders.service';
import { Climber } from '../climbers/climbers.entity';
import { ClimbersService } from '../climbers/climbers.service';
import { Repository } from 'typeorm';
import { Climb_log } from './climb-logs.entity';
import { climbLogUpdateDto } from './climb-logs.types';

@Injectable()
export class ClimbLogsService {
    constructor(
        @InjectRepository(Climb_log)
        private climbLogsRepository: Repository<Climb_log>,
        @InjectRepository(Climber)
        private climbersRepository: Repository<Climber>,
        @InjectRepository(Boulder)
        private bouldersRepository: Repository<Boulder>,
        private bouldersService:BouldersService,
        private climbersService: ClimbersService
    ) { }
    async insert(boulderId: number, climberId: number) {
        const newClimbLog = new Climb_log()
        const boulder = await this.bouldersService.findOne(boulderId)
        newClimbLog.boulder = boulder
        const climber = await this.climbersService.findOne(climberId)
        newClimbLog.climber = climber
        return await this.climbLogsRepository.save(newClimbLog)
    }

    async findAll(){
        const climbLogs = await this.climbLogsRepository.find({
            relations: {
                climber: true,
                boulder: true
            }
        })
        return climbLogs
    }

    async findOne(id:number){
        const climbLog = await this.climbLogsRepository.findOne({
            where:{
                id
            },
            relations:{
                climber:true,
                boulder:true
            }
        })
        if(!climbLog){
            throw new NotFoundException("Climb log not found!")
        }
        return climbLog
    }

    async remove(id:number){
        const deleteResult = await this.climbLogsRepository.delete(id)
        if (!deleteResult.affected) {
            throw new NotFoundException("Climb Log not found!")
        }
    }

    async patch(id:number, update:climbLogUpdateDto):Promise<Climb_log>{
        const climbLog = await this.findOne(id)
        if(update.boulderId){
            const boulder = await this.bouldersService.findOne(update.boulderId)
            climbLog.boulder = boulder
        }
        if (update.climberId) {
            const climber = await this.climbersRepository.findOneBy({ id: update.climberId })
            if (!climber) throw new NotFoundException("Climber not found!")
            climbLog.climber = climber
        }
        return this.climbLogsRepository.save(climbLog)
    }
}
