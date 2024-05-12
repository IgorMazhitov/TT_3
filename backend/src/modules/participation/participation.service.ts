import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Participants } from '../../entities/participants.entity';
import { Percentage } from '../../entities/percentage.entity';
import { Repository } from 'typeorm';
import { CreateNewParticipantDto } from './dtos/create-participant.dto';

@Injectable()
export class ParticipationService {
  constructor(
    @InjectRepository(Percentage)
    private percentageRepository: Repository<Percentage>,
    @InjectRepository(Participants)
    private participantsRepository: Repository<Participants>,
  ) {}

  async getAllParticipantss() {
    try {
      const participants = await this.participantsRepository.find();
      return participants;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async addParticipant(request: CreateNewParticipantDto) {
    try {
      let currentPercentage: Percentage =
        (await this.percentageRepository.findOne({ where: { id: 1 } })) ||
        (await this.percentageRepository.save({ value: 0 }));

      const isParticipantExist = await this.participantsRepository.findOne({
        where: { name: request.name, familyName: request.familyName },
      });

      let newPercentage = currentPercentage.value + request.participation;
      if (newPercentage > 100) {
        throw new HttpException('The participation value is too big', 400);
      }

      let newParticipant: Participants;
      if (isParticipantExist) {
        newParticipant = await this.participantsRepository.save({
          ...isParticipantExist,
          participation:
            request.participation + isParticipantExist.participation,
        });
      } else {
        newParticipant = await this.participantsRepository.save({
          name: request.name,
          familyName: request.familyName,
          participation: request.participation,
        });
      }

      const newPercentageEntity = await this.percentageRepository.save({
        ...currentPercentage,
        value: newPercentage,
      });

      return {
        newParticipant,
        newPercentageEntity,
      };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async deleteParticipant(id: number) {
    try {
      const participant = await this.participantsRepository.findOne({
        where: { id },
      });
      if (!participant) {
        throw new HttpException('Participant not found', 404);
      }

      let currentPercentage: Percentage =
        await this.percentageRepository.findOne({ where: { id: 1 } });

      let newPercentage = currentPercentage.value - participant.participation;

      const newPercentageEntity = await this.percentageRepository.save({
        ...currentPercentage,
        value: newPercentage,
      });

      await this.participantsRepository.delete({ id });

      return {
        newPercentageEntity,
      };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
