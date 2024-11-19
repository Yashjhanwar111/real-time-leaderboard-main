import {
  Catch,
  ArgumentsHost,
  WsExceptionFilter,
  BadRequestException,
} from '@nestjs/common';
import { WsException } from '@nestjs/websockets';

@Catch(WsException, BadRequestException)
export class WsExceptionsFilter implements WsExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const client = host.switchToWs().getClient();
    const response = {
      event: 'error',
      data: exception.getResponse(),
    };

    client.emit(response.event, response.data);
  }
}
