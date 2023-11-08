import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { isDefined } from 'class-validator';
import { Response } from '../../core/shared/classes/response.class';
import { TypeOrmHttpParamQuery } from '../../core/shared/classes/typeorm-query';
import { TypePieceEntity } from './type-piece.entity';

@Injectable()
export class TypePieceService {
  constructor(
    @InjectRepository(TypePieceEntity)
    private readonly typePieceRepository: Repository<TypePieceEntity>,
  ) {}

  async save(typePiece: object): Promise<Response> {
    const result = await this.typePieceRepository.save(typePiece as TypePieceEntity);
    return result;
  }

  async update(typePiece: object, primaryKey: object): Promise<Response> {
    const response: any = await this.findById(primaryKey);
    const result = await this.typePieceRepository.save({
      ...response.data,
      ...typePiece,
    });
    return result;
  }

  async delete(primaryKey: object): Promise<Response> {
    const response: any = await this.findById(primaryKey);
    const result: any = await this.typePieceRepository.delete(primaryKey);
    return response;
    // return result;
  }

  async find(query: object): Promise<Response> {
    const result = await this.typePieceRepository.find(
      TypeOrmHttpParamQuery(query),
    );
    return result;
  }

  async findById(primaryKey: object): Promise<Response> {
    const result = await this.typePieceRepository.findOne(primaryKey);
    if (!isDefined(result)) {
      throw new HttpException(
        {
          status: { code: HttpStatus.NOT_FOUND, error: `Aucun photo trouvé ` },
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return result;
  }
}
