import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ParticipationService } from './participation.service';
import { CreateNewParticipantDto } from './dtos/create-participant.dto';

@Controller('participation')
export class ParticipationController {
  constructor(private participationService: ParticipationService) {}

  @Get()
  async getAllParticipantss() {
    return await this.participationService.getAllParticipantss();
  }

  @Post('add')
  async addParticipant(@Body() request: CreateNewParticipantDto) {
    return await this.participationService.addParticipant(request);
  }

  @Delete('delete/:id')
  async deleteParticipant(@Param('id') id: number) {
    if (!id) throw new Error('Id is required')
    return await this.participationService.deleteParticipant(id);
  }
}
