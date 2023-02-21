import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Boulder } from 'src/boulders/boulders.entity';
import { BouldersService } from 'src/boulders/boulders.service';
import { Climber } from 'src/climbers/climbers.entity';
import { ClimbersService } from 'src/climbers/climbers.service';
import { ClimbLogsController } from './climb-logs.controller';
import { Climb_log } from './climb-logs.entity';
import { ClimbLogsService } from './climb-logs.service';

@Module({
  imports: [TypeOrmModule.forFeature([Climb_log, Boulder, Climber])],
  controllers: [ClimbLogsController],
  providers: [ClimbLogsService, BouldersService, ClimbersService]
})
export class ClimbLogsModule {}
