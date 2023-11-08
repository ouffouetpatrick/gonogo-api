import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { isDefined } from 'class-validator';
import { Response } from '../../core/shared/classes/response.class';
import { TypeOrmHttpParamQuery } from '../../core/shared/classes/typeorm-query';
import { DomaineActiviteEntity } from './domaine-activite.entity';

@Injectable()
export class DomaineActiviteService {
  constructor(
    @InjectRepository(DomaineActiviteEntity)
    private readonly domaineActiviteRepository: Repository<DomaineActiviteEntity>,
  ) {}

  async save(domaineActivite: object): Promise<Response> {
    const result = await this.domaineActiviteRepository.save(domaineActivite as DomaineActiviteEntity);
    return result;
  }

  async update(domaineActivite: object, primaryKey: object): Promise<Response> {
    const response: any = await this.findById(primaryKey);
    const result = await this.domaineActiviteRepository.save({
      ...response.data,
      ...domaineActivite,
    });
    return result;
  }

  async delete(primaryKey: object): Promise<Response> {
    const response: any = await this.findById(primaryKey);
    const result: any = await this.domaineActiviteRepository.delete(primaryKey);
    return response;
    // return result;
  }

  async find(query: object): Promise<Response> {
    const result = await this.domaineActiviteRepository.find(
      TypeOrmHttpParamQuery(query),
    );
    return result;
  }

  async findById(primaryKey: object): Promise<Response> {
    const result = await this.domaineActiviteRepository.findOne(primaryKey);
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
