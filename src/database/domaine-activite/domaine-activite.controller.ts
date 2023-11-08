import { ParseJsonPipe } from '../../core/shared/pipes/parse-json.pipe';
import { ValidationPipe } from '../../core/shared/pipes/validation.pipe';
// import { LoggingInterceptor } from '../../core/shared/interceptors/logging.interceptor';
import { ParseJsonObjectPipe } from 'src/core/shared/pipes/json-object.pipe';
// import { UseInterceptors } from '@nestjs/common/decorators/core/use-interceptors.decorator';
import { Catch } from '@nestjs/common/decorators/core/catch.decorator';
import { Controller } from '@nestjs/common/decorators/core/controller.decorator';
import { Delete, Get, Post, Put } from '@nestjs/common';
import { Body, Param } from '@nestjs/common/decorators/http/route-params.decorator';
import { DomaineActiviteDto } from './domaine-activite.dto';
import { DomaineActiviteService } from './domaine-activite.service';
// import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Catch()
// @UseInterceptors(LoggingInterceptor)
@Controller('domaineActivite')
export class DomaineActiviteController {
  constructor(private readonly domaineActiviteService: DomaineActiviteService) {}

  @Post()
  // @UseGuards(JwtAuthGuard)
  async save(@Body(new ValidationPipe()) domaineActiviteDto: DomaineActiviteDto) {
    const result = await this.domaineActiviteService.save(domaineActiviteDto);
    return result;
  }

  @Put(':primaryKey')
  // @UseGuards(JwtAuthGuard)
  async update(
    @Body(new ValidationPipe()) domaineActiviteDto: DomaineActiviteDto,
    @Param('primaryKey', new ParseJsonPipe()) primaryKey,
  ) {
    const result = await this.domaineActiviteService.update(domaineActiviteDto, primaryKey);
    return result;
  }

  @Delete(':primaryKey')
  // @UseGuards(JwtAuthGuard)
  async delete(@Param('primaryKey', new ParseJsonPipe()) primaryKey) {
    const result = await this.domaineActiviteService.delete(primaryKey);
    return result;
  }

  @Get()
  // @UseGuards(JwtAuthGuard)
  async find() {
    const result = await this.domaineActiviteService.find({});
    return result;
  }

  @Get('query/:findOption')
  // @UseGuards(JwtAuthGuard)
  async findQuery(@Param('findOption', new ParseJsonObjectPipe()) findOption) {
    const result = await this.domaineActiviteService.find(findOption);
    return result;
  }

  @Get(':primaryKey')
  // @UseGuards(JwtAuthGuard)
  async findById(@Param('primaryKey', new ParseJsonPipe()) primaryKey) {
    const result = await this.domaineActiviteService.findById(primaryKey);
    return result;
  }
}
