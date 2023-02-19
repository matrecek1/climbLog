import { Module } from '@nestjs/common';
import { ClimbLogsController } from './climb-logs.controller';
import { ClimbLogsService } from './climb-logs.service';

@Module({
  controllers: [ClimbLogsController],
  providers: [ClimbLogsService]
})
export class ClimbLogsModule {}
