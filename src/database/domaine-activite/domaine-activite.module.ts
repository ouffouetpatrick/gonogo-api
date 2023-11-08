import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DomaineActiviteEntity } from './domaine-activite.entity';
import { DomaineActiviteService } from './domaine-activite.service';
import { DomaineActiviteController } from './domaine-activite.controller';

@Module({
  imports: [TypeOrmModule.forFeature([DomaineActiviteEntity])],
  controllers: [DomaineActiviteController],
  providers: [DomaineActiviteService],
  exports: [DomaineActiviteService],
})
export class DomaineActiviteModule {}
