import { ParseJsonPipe } from '../../core/shared/pipes/parse-json.pipe';
import { ValidationPipe } from '../../core/shared/pipes/validation.pipe';
import { LoggingInterceptor } from '../../core/shared/interceptors/logging.interceptor';
import { ParseJsonObjectPipe } from 'src/core/shared/pipes/json-object.pipe';
import { UseInterceptors } from '@nestjs/common/decorators/core/use-interceptors.decorator';
import { Catch } from '@nestjs/common/decorators/core/catch.decorator';
import { Controller } from '@nestjs/common/decorators/core/controller.decorator';
import { Delete, Get, Post, Put, UseGuards } from '@nestjs/common';
import { Body, Param } from '@nestjs/common/decorators/http/route-params.decorator';
import { StatutJuridiqueDto } from './statut-juridique.dto';
import { StatutJuridiqueService } from './statut-juridique.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { EntityManager, Transaction, TransactionManager } from 'typeorm';

@Catch()
@UseInterceptors(LoggingInterceptor)
@Controller('statutJuridique')
export class StatutJuridiqueController {
  constructor(private readonly statutJuridiqueService: StatutJuridiqueService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async save(@Body(new ValidationPipe()) statutJuridiqueDto: StatutJuridiqueDto) {
    const result = await this.statutJuridiqueService.save(statutJuridiqueDto);
    return result;
  }

  @Put(':primaryKey')
  @UseGuards(JwtAuthGuard)
  async update(
    @Body(new ValidationPipe()) statutJuridiqueDto: StatutJuridiqueDto,
    @Param('primaryKey', new ParseJsonPipe()) primaryKey,
  ) {
    const result = await this.statutJuridiqueService.update(statutJuridiqueDto, primaryKey);
    return result;
  }

  @Delete(':primaryKey')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('primaryKey', new ParseJsonPipe()) primaryKey) {
    const result = await this.statutJuridiqueService.delete(primaryKey);
    return result;
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async find() {
    const result = await this.statutJuridiqueService.find({});
    return result;
  }

  @Get('query/:findOption')
  @UseGuards(JwtAuthGuard)
  async findQuery(@Param('findOption', new ParseJsonObjectPipe()) findOption) {
    const result = await this.statutJuridiqueService.find(findOption);
    return result;
  }

  @Get(':primaryKey')
  @UseGuards(JwtAuthGuard)
  async findById(@Param('primaryKey', new ParseJsonPipe()) primaryKey) {
    const result = await this.statutJuridiqueService.findById(primaryKey);
    return result;
  }

  @Post('supprimerStatutJuridique')
    @UseGuards(JwtAuthGuard)
    @Transaction()
    async supprimerStatutJuridique(@Body(new ValidationPipe()) statutJuridiqueDto: StatutJuridiqueDto,  @TransactionManager() manager: EntityManager) {
        const result = this.statutJuridiqueService.supprimerStatutJuridique(manager, statutJuridiqueDto);
        
        return result
    }
}
