import { Module } from '@nestjs/common';
import { ParticipationService } from './participation.service';
import { ParticipationController } from './participation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Percentage } from 'src/entities/percentage.entity';
import { Participants } from 'src/entities/participants.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Percentage, Participants])
  ],
  providers: [ParticipationService],
  controllers: [ParticipationController]
})
export class ParticipationModule {}
