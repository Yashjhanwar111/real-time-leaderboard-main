import { IsNumber, IsString, MinLength } from 'class-validator';

export class CreateRankDto {
  @IsString()
  @MinLength(3)
  name: string;

  @IsNumber()
  score: number;
}
