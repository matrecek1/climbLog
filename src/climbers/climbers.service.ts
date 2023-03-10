import { BadRequestException, Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Climber } from './climbers.entity';
import { ClimberUpdateDto, CreateClimberDto } from './climbers.types';

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
        const climber = await this.climbersRepository.findOneBy({id})
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
    async remove(id: number): Promise<void> {
        const deleteResult = await this.climbersRepository.delete(id)
        if (!deleteResult.affected) {
            throw new NotFoundException("Climber not found!")
        }
    }
    async patch(id: number, update: ClimberUpdateDto): Promise<Climber> {
        const climber = await this.findOne(id)
        return this.climbersRepository.save({
            ...climber,
            ...update
        })
    }
}
