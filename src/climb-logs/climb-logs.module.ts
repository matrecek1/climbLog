import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Boulder } from '../boulders/boulders.entity';
import { BouldersService } from '../boulders/boulders.service';
import { Climber } from '../climbers/climbers.entity';
import { ClimbersService } from '../climbers/climbers.service';
import { ClimbLogsController } from './climb-logs.controller';
import { Climb_log } from './climb-logs.entity';
import { ClimbLogsService } from './climb-logs.service';

@Module({
  imports: [TypeOrmModule.forFeature([Climb_log, Boulder, Climber])],
  controllers: [ClimbLogsController],
  providers: [ClimbLogsService, BouldersService, ClimbersService]
})
export class ClimbLogsModule {}
