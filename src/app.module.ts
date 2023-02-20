import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BouldersModule } from './boulders/boulders.module';
import { ClimbersModule } from './climbers/climbers.module';
import { ClimbLogsModule } from './climb-logs/climb-logs.module';


@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username: 'matej_cizek',
    password: 'brankari',
    database: 'climblog',
    autoLoadEntities:true,
    synchronize: true
  }), 
  BouldersModule, ClimbersModule, ClimbLogsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
