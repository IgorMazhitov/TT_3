import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';

export class CreateNewParticipantDto {
  @IsString({ message: 'Name must be a string' })
  @Length(3, 50, { message: 'Name must be between 3 and 50 characters' })
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @IsString({ message: 'Family name must be a string' })
  @Length(3, 50, { message: 'Family name must be between 3 and 50 characters' })
  @IsNotEmpty({ message: 'Family Name is required' })
  familyName: string;

  @IsNumber({}, { message: 'Participation percentage must be a number' })
  @Min(1, { message: 'Participation percentage must be greater than 0' })
  @Max(100, { message: 'Participation percentage must be less than 100' })
  @IsNotEmpty({ message: 'Partition percantage is required' })
  participation: number;
}
