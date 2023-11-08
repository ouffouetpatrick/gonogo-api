import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { isDefined } from 'class-validator';
import { Response } from '../../core/shared/classes/response.class';
import { TypeOrmHttpParamQuery } from '../../core/shared/classes/typeorm-query';
import { StatutJuridiqueEntity } from './statut-juridique.entity';

@Injectable()
export class StatutJuridiqueService {
  constructor(
    @InjectRepository(StatutJuridiqueEntity)
    private readonly statutJuridiqueRepository: Repository<StatutJuridiqueEntity>,
  ) {}

  async save(statutJuridique: object): Promise<Response> {
    const result = await this.statutJuridiqueRepository.save(statutJuridique as StatutJuridiqueEntity);
    return result;
  }

  async update(statutJuridique: object, primaryKey: object): Promise<Response> {
    const response: any = await this.findById(primaryKey);
    const result = await this.statutJuridiqueRepository.save({
      ...response.data,
      ...statutJuridique,
    });
    return result;
  }

  async delete(primaryKey: object): Promise<Response> {
    const response: any = await this.findById(primaryKey);
    const result: any = await this.statutJuridiqueRepository.delete(primaryKey);
    return response;
    // return result;
  }

  async find(query: object): Promise<Response> {
    const result = await this.statutJuridiqueRepository.find(
      TypeOrmHttpParamQuery(query),
    );
    return result;
  }

  async findById(primaryKey: object): Promise<Response> {
    const result = await this.statutJuridiqueRepository.findOne(primaryKey);
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
