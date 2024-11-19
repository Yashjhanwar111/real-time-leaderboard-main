import { Injectable } from '@nestjs/common';
import { CreateRankDto } from './dto/create-rank.dto';
import { UpdateRankDto } from './dto/update-rank.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Rank } from './entities/rank.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RanksService {
  constructor(
    @InjectRepository(Rank) private readonly rankRepo: Repository<Rank>,
  ) {}
  create(createRankDto: CreateRankDto) {
    return this.rankRepo.save(createRankDto);
  }

  findAll() {
    return this.rankRepo.find();
  }

  findOne(id: string) {
    return this.rankRepo.findOneBy({ id });
  }

  async update(id: string, updateRankDto: UpdateRankDto) {
    const rank = await this.findOne(id);
    return this.rankRepo.save({ ...rank, ...updateRankDto });
  }

  remove(id: string) {
    return this.rankRepo.delete({ id });
  }
}
