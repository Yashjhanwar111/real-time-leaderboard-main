import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { SocketService } from './socket.service';
import { Server } from 'socket.io';
import Redis from 'redis';

import { Inject, UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthSocket } from 'src/interfaces/auth-socket';
import { LeadbordEvents } from './enums/leadbord-events.emum';
import { WsExceptionsFilter } from './filters/ws-errors.filter';
import { SubmitScoreDto } from './dto/submit-score.dto';
import { GetGameScorsDto } from './dto/get-game-scors.dto';

@UsePipes(new ValidationPipe({ whitelist: true }))
@UseFilters(WsExceptionsFilter)
@WebSocketGateway()
export class SocketGateway {
  constructor(
    private readonly socketService: SocketService,
    @Inject('REDIS_PROVIDER') private readonly redis: Redis.RedisClientType,
  ) {}

  @WebSocketServer() private server: Server;

  @SubscribeMessage(LeadbordEvents.SUBMIT)
  async submitScore(
    @MessageBody() { score, gameId }: SubmitScoreDto,
    @ConnectedSocket() client: AuthSocket,
  ) {
    this.socketService.submitScore({
      gameId,
      score,
      userId: client.user.id,
    });
    client.emit(
      LeadbordEvents.GET_GAME_LEADBOARD,
      await this.socketService.getGameLeadBord(gameId),
    );
  }

  @SubscribeMessage(LeadbordEvents.GET_GAME_LEADBOARD)
  async getGameLeadBord(
    @MessageBody() { gameId }: GetGameScorsDto,
    @ConnectedSocket() client: AuthSocket,
  ) {
    return client.emit(
      LeadbordEvents.GET_GAME_LEADBOARD,
      await this.socketService.getGameLeadBord(gameId),
    );
  }
  @SubscribeMessage(LeadbordEvents.TOP_TEN)
  async getTopTen(
    @MessageBody() { gameId }: GetGameScorsDto,
    @ConnectedSocket() client: AuthSocket,
  ) {
    return client.emit(
      LeadbordEvents.TOP_TEN,
      await this.socketService.getTopTen(gameId),
    );
  }
}
