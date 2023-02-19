import { BadRequestException, Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Boulder } from './boulders.entity';
import { CreateBoulderDto, BoulderUpdateDto } from './boulders.types';

@Injectable()
export class BouldersService {
    constructor(
        @InjectRepository(Boulder)
        private bouldersRepository: Repository<Boulder>
    ) { }

    async insert(boulder:CreateBoulderDto): Promise<Boulder> {
        const newBoulder = new Boulder()
        newBoulder.name = boulder.name
        newBoulder.grade = boulder.grade
        newBoulder.description = boulder.description
        return await this.bouldersRepository.save(newBoulder)
    }

    findAll(): Promise<Boulder[]> {
        return this.bouldersRepository.find()
    }

    async findOne(id: number): Promise<Boulder> {
        const boulder = await this.bouldersRepository.findOneBy({ id })
        if(!boulder){
            throw new NotFoundException("Boulder not found!")
        }
        return boulder
    }

    async remove(id:number): Promise<void> {
        const deleteResult = await this.bouldersRepository.delete(id)
        if(!deleteResult.affected){
            throw new NotFoundException("Boulder not found!")
        }
    }
    async patch(id:number, update:BoulderUpdateDto): Promise<Boulder> {
        const boulder = await this.findOne(id)
        return this.bouldersRepository.save({
            ...boulder,
            ...update
        })
    }
}
