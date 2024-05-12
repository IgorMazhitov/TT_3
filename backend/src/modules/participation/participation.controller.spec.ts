import { Test, TestingModule } from '@nestjs/testing';
import { ParticipationController } from './participation.controller';
import { ParticipationService } from './participation.service';
import { Participants } from '../../entities/participants.entity';
import { Percentage } from '../../entities/percentage.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('ParticipationController', () => {
  let controller: ParticipationController;
  let participationService: ParticipationService;
  let percentageRepository: Repository<Percentage>;
  let participantsRepository: Repository<Participants>;

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
    percentageRepository = module.get<Repository<Percentage>>(
      getRepositoryToken(Percentage),
    );
    participantsRepository = module.get<Repository<Participants>>(
      getRepositoryToken(Participants),
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
