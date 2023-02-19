import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BouldersController } from './boulders.controller';
import { Boulder } from './boulders.entity';
import { BouldersService } from './boulders.service';

@Module({
    imports:[TypeOrmModule.forFeature([Boulder])],
    providers:[BouldersService],
    controllers:[BouldersController]
})
export class BouldersModule {}
