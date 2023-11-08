import { Body, Catch, Controller, Get, Param, Post, Put, Delete, UseGuards, UseInterceptors} from '@nestjs/common';
import { ParseJsonPipe } from '../../core/shared/pipes/parse-json.pipe';
import { ValidationPipe } from '../../core/shared/pipes/validation.pipe';
// import { LoggingInterceptor } from '../../core/shared/interceptors/logging.interceptor';
import { EntrepriseService } from './entreprise.service';
import { EntrepriseDto } from './entreprise.dto';
import { ParseJsonObjectPipe } from 'src/core/shared/pipes/json-object.pipe';
// import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Catch()
// @UseInterceptors(LoggingInterceptor)
@Controller('entreprise')
export class EntrepriseController {
    constructor(
        private readonly entrepriseService: EntrepriseService,
    ) {}

    @Post()
    // @UseGuards(JwtAuthGuard)
    async save(@Body(new ValidationPipe()) entrepriseDto: EntrepriseDto) {
        const result = await this.entrepriseService.save(entrepriseDto);
        return result;
    }
	
	@Put(':primaryKey')
    // @UseGuards(JwtAuthGuard)
    async update (@Body(new ValidationPipe()) entrepriseDto: EntrepriseDto, @Param('primaryKey', new ParseJsonPipe()) primaryKey) {
        const result = await this.entrepriseService.update(entrepriseDto,primaryKey);
        return result;
    }
    
    @Delete(':primaryKey')
    // @UseGuards(JwtAuthGuard)
    async delete (@Param('primaryKey', new ParseJsonPipe()) primaryKey) {
        const result = await this.entrepriseService.delete(primaryKey);
        return result;
    }

    @Get()
    // @UseGuards(JwtAuthGuard)
    async find() {
        const result = await this.entrepriseService.find({});
        return result;
    }

    @Get('query/:findOption')
    // @UseGuards(JwtAuthGuard)
    async findQuery(@Param('findOption',  new ParseJsonObjectPipe()) findOption) {
        const result = await this.entrepriseService.find(findOption);
        return result;
    }

    @Get(':primaryKey')
    // @UseGuards(JwtAuthGuard)
    async findById(@Param('primaryKey',  new ParseJsonPipe()) primaryKey) {
        const result = await this.entrepriseService.findById(primaryKey);
        return result;
    }
}
