import { Controller, Module } from '@nestjs/common';
import { ParticipationModule } from './modules/participation/participation.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Participants } from './entities/participants.entity';
import { Percentage } from './entities/percentage.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ParticipationModule,
    ConfigModule.forRoot({
      envFilePath: `.development.env`,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [Participants, Percentage],
      synchronize: true,
      autoLoadEntities: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
