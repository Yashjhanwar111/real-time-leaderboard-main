import { Socket } from 'socket.io';
import { JwtPayload } from 'src/modules/auth/dto/jwt-payload.dto';

export interface AuthSocket extends Socket {
  user: JwtPayload;
}
