import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypePieceEntity } from './type-piece.entity';
import { TypePieceService } from './type-piece.service';
import { TypePieceController } from './type-piece.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TypePieceEntity])],
  controllers: [TypePieceController],
  providers: [TypePieceService],
  exports: [TypePieceService],
})
export class TypePieceModule {}
