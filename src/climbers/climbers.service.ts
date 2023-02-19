import { BadRequestException, Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Climber } from './climbers.entity';
import { CreateClimberDto } from './climbers.types';

@Injectable()
export class ClimbersService {
    constructor(
        @InjectRepository(Climber)
        private climbersRepository: Repository<Climber>
    ) { }
    async findAll():Promise<Climber[]>{
        const climbers = this.climbersRepository.find()
        return climbers
    }

    async findOne(id:number){
        const climber = this.climbersRepository.findOneBy({id})
        if(!climber){
            throw new NotFoundException("Climber not found!")
        }
        return climber
    }
    async insert(climber:CreateClimberDto){
        const newClimber = new Climber()
        newClimber.firstName = climber.firstName
        newClimber.lastName = climber.lastName
        newClimber.surname = climber.surname
        return await this.climbersRepository.save(newClimber)
    }
}
