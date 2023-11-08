import { ParseJsonPipe } from '../../core/shared/pipes/parse-json.pipe';
import { ValidationPipe } from '../../core/shared/pipes/validation.pipe';
import { LoggingInterceptor } from '../../core/shared/interceptors/logging.interceptor';
import { ParseJsonObjectPipe } from 'src/core/shared/pipes/json-object.pipe';
import { UseInterceptors } from '@nestjs/common/decorators/core/use-interceptors.decorator';
import { Catch } from '@nestjs/common/decorators/core/catch.decorator';
import { Controller } from '@nestjs/common/decorators/core/controller.decorator';
import { Delete, Get, Post, Put } from '@nestjs/common';
import { Body, Param } from '@nestjs/common/decorators/http/route-params.decorator';
import { MetierEmployeDto } from './metier-employe.dto';
import { MetierEmployeService } from './metier-employe.service';
// import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Catch()
// @UseInterceptors(LoggingInterceptor)
@Controller('metierEmploye')
export class MetierEmployeController {
  constructor(private readonly metierEmployeService: MetierEmployeService) {}

  @Post()
  // @UseGuards(JwtAuthGuard)
  async save(@Body(new ValidationPipe()) metierEmployeDto: MetierEmployeDto) {
    const result = await this.metierEmployeService.save(metierEmployeDto);
    return result;
  }

  @Put(':primaryKey')
  // @UseGuards(JwtAuthGuard)
  async update(
    @Body(new ValidationPipe()) metierEmployeDto: MetierEmployeDto,
    @Param('primaryKey', new ParseJsonPipe()) primaryKey,
  ) {
    const result = await this.metierEmployeService.update(metierEmployeDto, primaryKey);
    return result;
  }

  @Delete(':primaryKey')
  // @UseGuards(JwtAuthGuard)
  async delete(@Param('primaryKey', new ParseJsonPipe()) primaryKey) {
    const result = await this.metierEmployeService.delete(primaryKey);
    return result;
  }

  @Get()
  // @UseGuards(JwtAuthGuard)
  async find() {
    const result = await this.metierEmployeService.find({});
    return result;
  }

  @Get('query/:findOption')
  // @UseGuards(JwtAuthGuard)
  async findQuery(@Param('findOption', new ParseJsonObjectPipe()) findOption) {
    const result = await this.metierEmployeService.find(findOption);
    return result;
  }

  @Get(':primaryKey')
  // @UseGuards(JwtAuthGuard)
  async findById(@Param('primaryKey', new ParseJsonPipe()) primaryKey) {
    const result = await this.metierEmployeService.findById(primaryKey);
    return result;
  }
}
