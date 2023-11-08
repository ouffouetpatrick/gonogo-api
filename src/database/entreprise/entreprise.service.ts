import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EntrepriseEntity } from './entreprise.entity';
import { isDefined } from 'class-validator';
import { Response } from '../../core/shared/classes/response.class';
import { TypeOrmHttpParamQuery } from '../../core/shared/classes/typeorm-query';

@Injectable()
export class EntrepriseService {
    constructor(
        @InjectRepository(EntrepriseEntity) private readonly entrepriseRepository: Repository<EntrepriseEntity>,
    ){}

    async save(entreprise: object): Promise<Response>{
        const result = await this.entrepriseRepository.save( entreprise as EntrepriseEntity);
        return result;
    }
    
    async update(entreprise: object, primaryKey: object): Promise<Response>{
        const response: any = await this.findById(primaryKey);
        const result = await this.entrepriseRepository.save({ ...response.data, ...entreprise });
        return result;
    }
    
    async delete(primaryKey: object): Promise<Response>{
        const response: any = await this.findById(primaryKey);
        const result: any = await this.entrepriseRepository.delete(primaryKey);
        return response;
        // return result;
    }

    async find(query: object): Promise<Response> {
        
        const result = await this.entrepriseRepository.find(TypeOrmHttpParamQuery(query));
        return result;
    }

    async findById(primaryKey: object): Promise<Response> {
        const result = await this.entrepriseRepository.findOne(primaryKey);
        if (!isDefined(result)){
            throw (new HttpException({status : { code: HttpStatus.NOT_FOUND, error: `Aucun entreprise trouvé `} }, HttpStatus.NOT_FOUND));
        }
        return result;
    }
}
