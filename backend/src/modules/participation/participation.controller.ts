import { Body, Controller, Get, Post } from '@nestjs/common';
import { ParticipationService } from './participation.service';
import { CreateNewParticipantDto } from './dtos/create-participant.dto';

@Controller('participation')
export class ParticipationController {
  constructor(private participationService: ParticipationService) {}

  @Get()
  async getAllParticipantss() {
    console.log('get all participants');
    return await this.participationService.getAllParticipantss();
  }

  @Post('add')
  async addParticipant(@Body() request: CreateNewParticipantDto) {
    console.log('add participant')
    console.log(request.name === "")
    return await this.participationService.addParticipant(request);
  }
}
