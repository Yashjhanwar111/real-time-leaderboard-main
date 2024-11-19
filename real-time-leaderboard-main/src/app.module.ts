import { Module } from '@nestjs/common';
import { DbModule } from './modules/db/db.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { SocketModule } from './socket/socket.module';
import { GamesModule } from './modules/games/games.module';
import { RanksModule } from './modules/ranks/ranks.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_KEY,
      signOptions: {
        expiresIn: '30d',
      },
    }),
    DbModule,
    AuthModule,
    UsersModule,
    SocketModule,
    GamesModule,
    RanksModule,
  ],
})
export class AppModule {}
