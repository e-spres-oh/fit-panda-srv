import { IsDateString, IsOptional } from 'class-validator';

export class FoodQuery {
  @IsOptional()
  @IsDateString()
  consumedAt: string;
}
