import { Logger, Module } from '@nestjs/common';
import { SocketService } from './socket.service';
import { SocketGateway } from './socket.gateway';
import * as Redis from 'redis';

@Module({
  providers: [
    SocketGateway,
    SocketService,
    {
      provide: 'REDIS_PROVIDER',
      useFactory: async () => {
        Logger.debug('redis is connect');
        const client = Redis.createClient({ url: process.env.REDIS_URL });
        await client.connect();
        return client;
      },
    },
  ],
  exports: ['REDIS_PROVIDER'],
})
export class SocketModule {}
