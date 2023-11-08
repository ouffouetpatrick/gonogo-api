import { Body, Catch, Controller, Get, Param, Post, Put, Delete, UseGuards, UseInterceptors} from '@nestjs/common';
import { ParseJsonPipe } from '../../core/shared/pipes/parse-json.pipe';
import { ValidationPipe } from '../../core/shared/pipes/validation.pipe';
// import { LoggingInterceptor } from '../../core/shared/interceptors/logging.interceptor';
import { EmployeService } from './employe.service';
import { EmployeDto } from './employe.dto';
import { ParseJsonObjectPipe } from 'src/core/shared/pipes/json-object.pipe';
// import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Catch()
// @UseInterceptors(LoggingInterceptor)
@Controller('employe')
export class EmployeController {
    constructor(
        private readonly employeService: EmployeService,
    ) {}

    @Post()
    // @UseGuards(JwtAuthGuard)
    async save(@Body(new ValidationPipe()) employeDto: EmployeDto) {
        const result = await this.employeService.save(employeDto);
        return result;
    }
	
	@Put(':primaryKey')
    // @UseGuards(JwtAuthGuard)
    async update (@Body(new ValidationPipe()) employeDto: EmployeDto, @Param('primaryKey', new ParseJsonPipe()) primaryKey) {
        const result = await this.employeService.update(employeDto,primaryKey);
        return result;
    }
    
    @Delete(':primaryKey')
    // @UseGuards(JwtAuthGuard)
    async delete (@Param('primaryKey', new ParseJsonPipe()) primaryKey) {
        const result = await this.employeService.delete(primaryKey);
        return result;
    }

    @Get()
    // @UseGuards(JwtAuthGuard)
    async find() {
        const result = await this.employeService.find({});
        return result;
    }

    @Get('query/:findOption')
    // @UseGuards(JwtAuthGuard)
    async findQuery(@Param('findOption',  new ParseJsonObjectPipe()) findOption) {
        const result = await this.employeService.find(findOption);
        return result;
    }

    @Get(':primaryKey')
    // @UseGuards(JwtAuthGuard)
    async findById(@Param('primaryKey',  new ParseJsonPipe()) primaryKey) {
        const result = await this.employeService.findById(primaryKey);
        return result;
    }
}
