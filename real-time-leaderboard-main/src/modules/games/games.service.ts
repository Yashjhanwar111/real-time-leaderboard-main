import { Injectable } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Game } from './entities/game.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GamesService {
  constructor(
    @InjectRepository(Game) private readonly gameRepo: Repository<Game>,
  ) {}
  create(createGameDto: CreateGameDto) {
    return this.gameRepo.save(createGameDto);
  }

  findAll() {
    return this.gameRepo.find();
  }

  findOne(id: string) {
    return this.gameRepo.findOneBy({ id });
  }

  async update(id: string, updateGameDto: UpdateGameDto) {
    const game = await this.findOne(id);
    return this.gameRepo.save({ ...game, ...updateGameDto });
  }

  remove(id: string) {
    return this.gameRepo.delete({ id });
  }
}
