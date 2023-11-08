import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { isDefined } from 'class-validator';
import { Response } from '../../core/shared/classes/response.class';
import { TypeOrmHttpParamQuery } from '../../core/shared/classes/typeorm-query';
import { MetierEmployeEntity } from './metier-employe.entity';

@Injectable()
export class MetierEmployeService {
  constructor(
    @InjectRepository(MetierEmployeEntity)
    private readonly metierEmployeRepository: Repository<MetierEmployeEntity>,
  ) {}

  async save(metierEmploye: object): Promise<Response> {
    const result = await this.metierEmployeRepository.save(metierEmploye as MetierEmployeEntity);
    return result;
  }

  async update(metierEmploye: object, primaryKey: object): Promise<Response> {
    const response: any = await this.findById(primaryKey);
    const result = await this.metierEmployeRepository.save({
      ...response.data,
      ...metierEmploye,
    });
    return result;
  }

  async delete(primaryKey: object): Promise<Response> {
    const response: any = await this.findById(primaryKey);
    const result: any = await this.metierEmployeRepository.delete(primaryKey);
    return response;
    // return result;
  }

  async find(query: object): Promise<Response> {
    const result = await this.metierEmployeRepository.find(
      TypeOrmHttpParamQuery(query),
    );
    return result;
  }

  async findById(primaryKey: object): Promise<Response> {
    const result = await this.metierEmployeRepository.findOne(primaryKey);
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
