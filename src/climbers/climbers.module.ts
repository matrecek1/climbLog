import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClimbersController } from './climbers.controller';
import { Climber } from './climbers.entity';
import { ClimbersService } from './climbers.service';

@Module({
    imports:[TypeOrmModule.forFeature([Climber])],
    providers: [ClimbersService],
    controllers: [ClimbersController]
})
export class ClimbersModule {}
