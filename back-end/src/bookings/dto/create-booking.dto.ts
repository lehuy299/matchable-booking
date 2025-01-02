import { IsDateString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateBookingDTO {
  @IsNumber()
  @IsNotEmpty()
  trainerSessionId: number;

  @IsDateString()
  @IsNotEmpty()
  startDate: string;

  @IsNumber()
  @IsNotEmpty()
  duration: number;
}
