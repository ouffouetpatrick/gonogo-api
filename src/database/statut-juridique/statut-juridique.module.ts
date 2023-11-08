import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatutJuridiqueEntity } from './statut-juridique.entity';
import { StatutJuridiqueService } from './statut-juridique.service';
import { StatutJuridiqueController } from './statut-juridique.controller';

@Module({
  imports: [TypeOrmModule.forFeature([StatutJuridiqueEntity])],
  controllers: [StatutJuridiqueController],
  providers: [StatutJuridiqueService],
  exports: [StatutJuridiqueService],
})
export class StatutJuridiqueModule {}
