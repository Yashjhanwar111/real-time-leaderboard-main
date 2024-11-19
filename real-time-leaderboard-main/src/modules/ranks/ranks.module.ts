import { Module } from '@nestjs/common';
import { RanksService } from './ranks.service';
import { RanksController } from './ranks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rank } from './entities/rank.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Rank])],
  controllers: [RanksController],
  providers: [RanksService],
})
export class RanksModule {}
