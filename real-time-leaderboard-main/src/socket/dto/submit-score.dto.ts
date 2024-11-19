import { IsNumber, IsUUID } from 'class-validator';

export class SubmitScoreDto {
  @IsUUID()
  gameId: string;

  @IsNumber()
  score: number;
}
