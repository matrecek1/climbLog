import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BouldersModule } from './boulders/boulders.module';
import { ClimbersModule } from './climbers/climbers.module';
import { ClimbLogsModule } from './climb-logs/climb-logs.module';
import * as dotenv from 'dotenv' 
import { Climber } from './climbers/climbers.entity';
import { Boulder } from './boulders/boulders.entity';
import { Climb_log } from './climb-logs/climb-logs.entity';
dotenv.config({ path:'/Users/matejcizek/Desktop/Projects/my-sql-database/boulder-log/.env'})


@Module({
  imports: [TypeOrmModule.forRootAsync({
    useFactory: async (configService) => {
      if (process.env.NODE_ENV === 'test') {
        return {
          type: 'mysql',
          host: process.env.DB_HOST,
          port: parseInt(process.env.DB_PORT),
          username: process.env.DB_USERNAME,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_TESTNAME,
          entities:[Climber, Boulder, Climb_log],
          dropSchema:true,
          synchronize: true
        }
      }
      return {
        type: 'mysql',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        autoLoadEntities: true,
        synchronize: true
      };
    },
  }),
  BouldersModule, ClimbersModule, ClimbLogsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
