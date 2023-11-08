import { ParseJsonPipe } from '../../core/shared/pipes/parse-json.pipe';
import { ValidationPipe } from '../../core/shared/pipes/validation.pipe';
import { TypePieceService } from './type-piece.service';
import { TypePieceDto } from './type-piece.dto';
import { ParseJsonObjectPipe } from 'src/core/shared/pipes/json-object.pipe';
// import { UseInterceptors } from '@nestjs/common/decorators/core/use-interceptors.decorator';
import { Catch } from '@nestjs/common/decorators/core/catch.decorator';
import { Controller } from '@nestjs/common/decorators/core/controller.decorator';
import { Delete, Get, Post, Put } from '@nestjs/common';
import { Body, Param } from '@nestjs/common/decorators/http/route-params.decorator';
// import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Catch()
// @UseInterceptors(LoggingInterceptor)
@Controller('typePiece')
export class TypePieceController {
  constructor(private readonly typePieceService: TypePieceService) {}

  @Post()
  // @UseGuards(JwtAuthGuard)
  async save(@Body(new ValidationPipe()) typePieceDto: TypePieceDto) {
    const result = await this.typePieceService.save(typePieceDto);
    return result;
  }

  @Put(':primaryKey')
  // @UseGuards(JwtAuthGuard)
  async update(
    @Body(new ValidationPipe()) typePieceDto: TypePieceDto,
    @Param('primaryKey', new ParseJsonPipe()) primaryKey,
  ) {
    const result = await this.typePieceService.update(typePieceDto, primaryKey);
    return result;
  }

  @Delete(':primaryKey')
  // @UseGuards(JwtAuthGuard)
  async delete(@Param('primaryKey', new ParseJsonPipe()) primaryKey) {
    const result = await this.typePieceService.delete(primaryKey);
    return result;
  }

  @Get()
  // @UseGuards(JwtAuthGuard)
  async find() {
    const result = await this.typePieceService.find({});
    return result;
  }

  @Get('query/:findOption')
  // @UseGuards(JwtAuthGuard)
  async findQuery(@Param('findOption', new ParseJsonObjectPipe()) findOption) {
    const result = await this.typePieceService.find(findOption);
    return result;
  }

  @Get(':primaryKey')
  // @UseGuards(JwtAuthGuard)
  async findById(@Param('primaryKey', new ParseJsonPipe()) primaryKey) {
    const result = await this.typePieceService.findById(primaryKey);
    return result;
  }
}
