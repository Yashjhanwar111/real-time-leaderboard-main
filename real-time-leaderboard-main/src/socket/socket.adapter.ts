import { IoAdapter } from '@nestjs/platform-socket.io';
import { Server, ServerOptions } from 'socket.io';
import { createAdapter } from '@socket.io/redis-adapter';
import { AuthSocket } from 'src/interfaces/auth-socket';
import { INestApplication, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class SocketIoAdapter extends IoAdapter {
  private adapterConstructor: ReturnType<typeof createAdapter>;
  constructor(
    private app: INestApplication,
    private readonly jwt: JwtService,
  ) {
    super(app);
  }

  createIOServer(port: number, options?: ServerOptions): any {
    const server: Server = super.createIOServer(port, options);
    // auth
    this.authServerMD(server);

    return server;
  }

  private authServerMD(server: Server) {
    server.use(async (socket: AuthSocket, next) => {
      const headers = socket.handshake.headers;
      try {
        if (headers.authorization) {
          const token = headers.authorization;
          const validate = this.jwt.verify(token);
          socket.user = validate;
          Logger.debug(`${validate.id} is auth`);
          next();
        } else {
          Logger.error('faild to auth');
          throw new Error('Unauthorized');
        }
      } catch (error) {
        Logger.error(error.message);
        next(new Error(error.message));
      }
    });
  }
}
