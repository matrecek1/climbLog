import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BouldersModule } from './boulders/boulders.module';
import { ClimbersModule } from './climbers/climbers.module';
import { ClimbLogsModule } from './climb-logs/climb-logs.module';
import * as dotenv from 'dotenv' 
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
          autoLoadEntities: true,
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
