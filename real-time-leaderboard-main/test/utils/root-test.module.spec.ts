import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AuthController } from 'src/modules/auth/auth.controller';
import { AuthService } from 'src/modules/auth/auth.service';
import { User } from 'src/modules/users/entities/user.entity';
import { UsersController } from 'src/modules/users/users.controller';
import { UsersService } from 'src/modules/users/users.service';

const values = {
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  findOne: jest.fn(),
  findAll: jest.fn(),
};
export async function RootTestingModule(): Promise<TestingModule> {
  return await Test.createTestingModule({
    controllers: [AuthController, UsersController],
    providers: [
      JwtService,
      UsersService,
      AuthService,
      {
        provide: getRepositoryToken(User),
        useValue: values,
      },
    ],
  }).compile();
}
