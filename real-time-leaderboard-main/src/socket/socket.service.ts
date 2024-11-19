import { Inject, Injectable } from '@nestjs/common';
import { RedisClientType } from 'redis';
import { SubmitScoreDto } from './dto/submit-score.dto';

@Injectable()
export class SocketService {
  private readonly leadbordKey = 'leadbord';

  constructor(
    @Inject('REDIS_PROVIDER') private readonly redis: RedisClientType,
  ) {}

  submitScore({ gameId, score, userId }: SubmitScoreDto & { userId: string }) {
    this.redis.zAdd(`${this.leadbordKey}:${gameId}`, {
      score: score,
      value: userId,
    });
  }

  getGameLeadBord(gameId: string) {
    return this.redis.zRangeWithScores(`${this.leadbordKey}:${gameId}`, 0, -1);
  }

  getTopTen(gameId: string) {
    return this.redis.zRangeWithScores(`${this.leadbordKey}:${gameId}`, 0, 9, {
      REV: true,
    });
  }
}
