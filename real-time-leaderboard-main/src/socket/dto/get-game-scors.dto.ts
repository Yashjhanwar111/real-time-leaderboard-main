import { IsUUID } from 'class-validator';

export class GetGameScorsDto {
  @IsUUID()
  gameId: string;
}
