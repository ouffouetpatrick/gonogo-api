import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StatutMatrimonialEntity } from './statut-matrimonial.entity';
import { isDefined } from 'class-validator';
import { Response } from '../../core/shared/classes/response.class';
import { TypeOrmHttpParamQuery } from '../../core/shared/classes/typeorm-query';

@Injectable()
export class StatutMatrimonialService {
  constructor(
    @InjectRepository(StatutMatrimonialEntity)
    private readonly statutMatrimonialRepository: Repository<StatutMatrimonialEntity>,
  ) {}

  async save(statutMatrimonial: object): Promise<Response> {
    const result = await this.statutMatrimonialRepository.save(statutMatrimonial as StatutMatrimonialEntity);
    return result;
  }

  async update(statutMatrimonial: object, primaryKey: object): Promise<Response> {
    const response: any = await this.findById(primaryKey);
    const result = await this.statutMatrimonialRepository.save({
      ...response.data,
      ...statutMatrimonial,
    });
    return result;
  }

  async delete(primaryKey: object): Promise<Response> {
    const response: any = await this.findById(primaryKey);
    const result: any = await this.statutMatrimonialRepository.delete(primaryKey);
    return response;
    // return result;
  }

  async find(query: object): Promise<Response> {
    const result = await this.statutMatrimonialRepository.find(
      TypeOrmHttpParamQuery(query),
    );
    return result;
  }

  async findById(primaryKey: object): Promise<Response> {
    const result = await this.statutMatrimonialRepository.findOne(primaryKey);
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
