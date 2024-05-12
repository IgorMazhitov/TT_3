import { Test, TestingModule } from '@nestjs/testing';
import { CreateNewParticipantDto } from './dtos/create-participant.dto';
import { ParticipationController } from './participation.controller';
import { ParticipationService } from './participation.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Percentage } from '../../entities/percentage.entity';
import { Repository } from 'typeorm';
import { Participants } from '../../entities/participants.entity';

describe('ParticipationController', () => {
  let controller: ParticipationController;
  let participationService: ParticipationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParticipationController],
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

    controller = module.get<ParticipationController>(ParticipationController);
    participationService =
      module.get<ParticipationService>(ParticipationService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllParticipantss', () => {
    it('should return an array of participants', async () => {
      const participants = [
        { id: 1, name: 'John', familyName: 'Doe', participation: 50 },
      ];
      jest
        .spyOn(participationService, 'getAllParticipantss')
        .mockResolvedValue(participants);

      const result = await controller.getAllParticipantss();
      expect(result).toEqual(participants);
    });

    it('should handle errors during participant retrieval', async () => {
      jest
        .spyOn(participationService, 'getAllParticipantss')
        .mockRejectedValue(new Error('Failed to retrieve participants'));

      await expect(controller.getAllParticipantss()).rejects.toThrowError(
        'Failed to retrieve participants',
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
      const newParticipant = {
        id: 1,
        name: 'Jane',
        familyName: 'Smith',
        participation: 30,
      };
      const newPercentageEntity = { id: 1, value: 30 };

      jest
        .spyOn(participationService, 'addParticipant')
        .mockResolvedValue({ newParticipant, newPercentageEntity });

      const result = await controller.addParticipant(request);
      expect(result).toEqual({ newParticipant, newPercentageEntity });
    });

    it('should handle errors during participant addition', async () => {
      const request: CreateNewParticipantDto = {
        name: 'Jane',
        familyName: 'Smith',
        participation: 30,
      };

      jest
        .spyOn(participationService, 'addParticipant')
        .mockRejectedValue(new Error('Failed to add participant'));

      await expect(controller.addParticipant(request)).rejects.toThrowError(
        'Failed to add participant',
      );
    });
  });

  describe('deleteParticipant', () => {
    it('should delete a participant', async () => {
      const id = 1;
      const newPercentageEntity = { id: 1, value: 20 };

      jest
        .spyOn(participationService, 'deleteParticipant')
        .mockResolvedValue({ newPercentageEntity });

      const result = await controller.deleteParticipant(id);
      expect(result).toEqual({ newPercentageEntity });
    });

    it('should handle errors during participant deletion', async () => {
      const id = 1;

      jest
        .spyOn(participationService, 'deleteParticipant')
        .mockRejectedValue(new Error('Failed to delete participant'));

      await expect(controller.deleteParticipant(id)).rejects.toThrowError(
        'Failed to delete participant',
      );
    });
  });
});
