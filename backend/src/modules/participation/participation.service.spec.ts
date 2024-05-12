import { Test, TestingModule } from '@nestjs/testing';
import { ParticipationService } from './participation.service';
import { Participants } from '../../entities/participants.entity';
import { Percentage } from '../../entities/percentage.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateNewParticipantDto } from './dtos/create-participant.dto';
import { HttpException } from '@nestjs/common';

describe('ParticipationService', () => {
  let service: ParticipationService;
  let percentageRepository: Repository<Percentage>;
  let participantsRepository: Repository<Participants>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ParticipationService,
        {
          provide: getRepositoryToken(Percentage),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Participants),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<ParticipationService>(ParticipationService);
    percentageRepository = module.get<Repository<Percentage>>(
      getRepositoryToken(Percentage),
    );
    participantsRepository = module.get<Repository<Participants>>(
      getRepositoryToken(Participants),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllParticipants', () => {
    it('should return an array of participants', async () => {
      const participants = [
        { id: 1, name: 'John', familyName: 'Doe', participation: 50 },
      ];
      jest
        .spyOn(participantsRepository, 'find')
        .mockResolvedValue(participants);

      const result = await service.getAllParticipantss();
      expect(result).toEqual(participants);
    });

    it('should throw an error if an exception occurs', async () => {
      jest
        .spyOn(participantsRepository, 'find')
        .mockRejectedValue(new Error('Database error'));

      await expect(service.getAllParticipantss()).rejects.toThrow(
        HttpException,
      );
    });
  });

  describe('addParticipant', () => {
    it('should add a new participant', async () => {
      const request: CreateNewParticipantDto = {
        name: 'Jane',
        familyName: 'Smith',
        participation: 30,
      };
      const currentPercentage = { id: 1, value: 20 };
      const isParticipantExist = null;
      const newParticipant = {
        id: 2,
        name: 'Jane',
        familyName: 'Smith',
        participation: 30,
      };
      const newPercentageEntity = { id: 1, value: 50 };

      jest
        .spyOn(percentageRepository, 'findOne')
        .mockResolvedValue(currentPercentage);
      jest
        .spyOn(percentageRepository, 'save')
        .mockResolvedValue(newPercentageEntity);
      jest
        .spyOn(participantsRepository, 'findOne')
        .mockResolvedValue(isParticipantExist);
      jest
        .spyOn(participantsRepository, 'save')
        .mockResolvedValue(newParticipant);

      const result = await service.addParticipant(request);
      expect(result.newParticipant).toEqual(newParticipant);
      expect(result.newPercentageEntity).toEqual(newPercentageEntity);
    });

    it('should update existing participant', async () => {
      const request: CreateNewParticipantDto = {
        name: 'Jane',
        familyName: 'Smith',
        participation: 30,
      };
      const currentPercentage = { id: 1, value: 20 };
      const isParticipantExist = {
        id: 1,
        name: 'Jane',
        familyName: 'Smith',
        participation: 20,
      };
      const newParticipant = {
        id: 1,
        name: 'Jane',
        familyName: 'Smith',
        participation: 50,
      };
      const newPercentageEntity = { id: 1, value: 50 };

      jest
        .spyOn(percentageRepository, 'findOne')
        .mockResolvedValue(currentPercentage);
      jest
        .spyOn(percentageRepository, 'save')
        .mockResolvedValue(newPercentageEntity);
      jest
        .spyOn(participantsRepository, 'findOne')
        .mockResolvedValue(isParticipantExist);
      jest
        .spyOn(participantsRepository, 'save')
        .mockResolvedValue(newParticipant);

      const result = await service.addParticipant(request);
      expect(result.newParticipant).toEqual(newParticipant);
      expect(result.newPercentageEntity).toEqual(newPercentageEntity);
    });

    it('should throw an error if participation value is too big', async () => {
      const request: CreateNewParticipantDto = {
        name: 'Jane',
        familyName: 'Smith',
        participation: 90,
      };
      const currentPercentage = { id: 1, value: 20 };

      const isParticipantExist = {
        id: 1,
        name: 'Jane',
        familyName: 'Smith',
        participation: 20,
      };

      jest
        .spyOn(participantsRepository, 'findOne')
        .mockResolvedValue(isParticipantExist);
      jest
        .spyOn(percentageRepository, 'findOne')
        .mockResolvedValue(currentPercentage);

      await expect(service.addParticipant(request)).rejects.toThrowError(
        'The participation value is too big',
      );
    });

    it('should handle errors during participant addition', async () => {
      const request: CreateNewParticipantDto = {
        name: 'Jane',
        familyName: 'Smith',
        participation: 30,
      };

      jest
        .spyOn(percentageRepository, 'findOne')
        .mockRejectedValue(new Error('Failed to find percentage'));

      await expect(service.addParticipant(request)).rejects.toThrowError(
        'Failed to find percentage',
      );
    });
  });

  describe('deleteParticipant', () => {
    it('should delete a participant and update percentage', async () => {
      const participant = {
        id: 1,
        name: 'John',
        familyName: 'Doe',
        participation: 50,
      };
      const currentPercentage = { id: 1, value: 70 };
      const newPercentageValue =
        currentPercentage.value - participant.participation;
      const newPercentageEntity = { id: 1, value: newPercentageValue };

      jest
        .spyOn(participantsRepository, 'findOne')
        .mockResolvedValue(participant);
      jest
        .spyOn(percentageRepository, 'findOne')
        .mockResolvedValue(currentPercentage);
      jest
        .spyOn(percentageRepository, 'save')
        .mockResolvedValue(newPercentageEntity);
      jest.spyOn(participantsRepository, 'delete').mockResolvedValue(undefined);

      const result = await service.deleteParticipant(1);

      expect(result.newPercentageEntity).toEqual(newPercentageEntity);
      expect(percentageRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(participantsRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(participantsRepository.delete).toHaveBeenCalledWith({ id: 1 });
      expect(percentageRepository.save).toHaveBeenCalledWith(
        newPercentageEntity,
      );
    });

    it('should throw an error if participant is not found', async () => {
      jest
        .spyOn(participantsRepository, 'findOne')
        .mockResolvedValue(undefined);

      await expect(service.deleteParticipant(1)).rejects.toThrowError(
        'Participant not found',
      );
    });

    it('should handle errors during participant deletion', async () => {
      const participant = {
        id: 1,
        name: 'John',
        familyName: 'Doe',
        participation: 50,
      };
      const currentPercentage = { id: 1, value: 70 };

      jest
        .spyOn(participantsRepository, 'findOne')
        .mockResolvedValue(participant);
      jest
        .spyOn(percentageRepository, 'findOne')
        .mockResolvedValue(currentPercentage);
      jest
        .spyOn(percentageRepository, 'save')
        .mockRejectedValue(new Error('Failed to save percentage'));

      await expect(service.deleteParticipant(1)).rejects.toThrowError(
        'Failed to save percentage',
      );
    });
  });
});
