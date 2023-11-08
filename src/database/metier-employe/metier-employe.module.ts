import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MetierEmployeEntity } from './metier-employe.entity';
import { MetierEmployeService } from './metier-employe.service';
import { MetierEmployeController } from './metier-employe.controller';

@Module({
  imports: [TypeOrmModule.forFeature([MetierEmployeEntity])],
  controllers: [MetierEmployeController],
  providers: [MetierEmployeService],
  exports: [MetierEmployeService],
})
export class MetierEmployeModule {}
