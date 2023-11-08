import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatutMatrimonialEntity } from './statut-matrimonial.entity';
import { StatutMatrimonialService } from './statut-matrimonial.service';
import { StatutMatrimonialController } from './statut-matrimonial.controller';

@Module({
  imports: [TypeOrmModule.forFeature([StatutMatrimonialEntity])],
  controllers: [StatutMatrimonialController],
  providers: [StatutMatrimonialService],
  exports: [StatutMatrimonialService],
})
export class StatutMatrimonialModule {}
