import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntrepriseEntity } from './entreprise.entity';
import { EntrepriseService } from './entreprise.service';
import { EntrepriseController } from './entreprise.controller';


@Module({
  imports: [TypeOrmModule.forFeature([EntrepriseEntity])],
  controllers: [EntrepriseController],
  providers: [EntrepriseService],
  exports: [EntrepriseService],
})
export class EntrepriseModule {}
