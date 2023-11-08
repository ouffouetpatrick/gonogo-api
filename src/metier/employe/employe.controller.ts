import { Body, Catch, Controller, Post, UseGuards, UseInterceptors, Get, UploadedFiles } from '@nestjs/common';
import { ValidationPipe } from '../../core/shared/pipes/validation.pipe';
import { LoggingInterceptor } from '../../core/shared/interceptors/logging.interceptor';
import { Transaction, TransactionManager, EntityManager } from 'typeorm';
import { EmployeMetierService } from './employe.service';
import { EmployeDto } from 'src/database/employe/employe.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from 'src/utils/file-upload.utils';

@Catch()
@UseInterceptors(LoggingInterceptor)
@Controller('metier/employe')
export class EmployeMetierController {
    constructor(
        private readonly employeMetierService: EmployeMetierService,
    ) {}

    @Post('ajouterEmploye')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(
        FilesInterceptor('image', 5, {
            storage: diskStorage({
                destination: './uploads/employe',
                filename: editFileName,
            }),
            fileFilter: imageFileFilter,
        }),
    )
    @Transaction() async ajouterEmploye(
            @UploadedFiles() files,
            @Body(new ValidationPipe()) employeDto: any,  
            @TransactionManager() manager: EntityManager
        ) {

            const response = [];
            files.forEach(file => {
            const fileReponse = {
                originalname: file.originalname,
                filename: file.filename,
            };
            response.push(fileReponse);
            });
            
            const result = await this.employeMetierService.ajouterEmploye(manager,employeDto,response);

        return result
    }



    // @Get('recupererEmploye')
    // // @UseGuards(JwtAuthGuard)
    // @Transaction()
    // async recupererEmploye(@TransactionManager() manager: EntityManager,) {
    //     const result = this.employeMetierService.recupererEmploye(manager);

    //     return result;
    // }

    @Post('supprimerEmploye')
    // @UseGuards(JwtAuthGuard)
    @Transaction()
    async supprimerEmploye(@Body(new ValidationPipe()) employeDto: EmployeDto,  @TransactionManager() manager: EntityManager) {
        const result = this.employeMetierService.supprimerEmploye(manager, employeDto);
        
        return result
    }


    //Faire une recherche journalière
    @Post('rechercherByDay')
    @Transaction() async rechercherByDay( @Body(new ValidationPipe()) query: any, @TransactionManager() manager: EntityManager) {
        const result = this.employeMetierService.rechercherByDay(manager,query);
        return result;
    }

    @Post('rechercherByWeek')
    @Transaction() async rechercherByWeek( @Body(new ValidationPipe()) query: any, @TransactionManager() manager: EntityManager) {
        const result = this.employeMetierService.rechercherByWeek(manager,query);
        return result;
    }

    @Post('rechercherByMonth')
    @Transaction() async rechercherByMonth( @Body(new ValidationPipe()) query: any, @TransactionManager() manager: EntityManager) {
        const result = this.employeMetierService.rechercherByMonth(manager,query);
        return result;
    }

    @Post('rechercherByYear')
    @Transaction()async rechercherByYear( @Body(new ValidationPipe()) query: any, @TransactionManager() manager: EntityManager) {
        const result = this.employeMetierService.rechercherByYear(manager,query);
        return result;
    }

    @Get('                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    ')
    // @UseGuards(JwtAuthGuard)
    @Transaction()
    async effectifEmploye(@TransactionManager() manager: EntityManager,) {
        const result = this.employeMetierService.effectifEmploye(manager);

        return result;
    }

    @Get('effectifEmployeBySexe')
    // @UseGuards(JwtAuthGuard)
    @Transaction()
    async effectifEmployeBySexe(@TransactionManager() manager: EntityManager,) {
        const result = this.employeMetierService.effectifEmployeBySexe(manager);

        return result;
    }

    @Get('effectifEmployeByStatutMatrimonial')
    // @UseGuards(JwtAuthGuard)
    @Transaction()
    async effectifEmployeByStatutMatrimonial(@TransactionManager() manager: EntityManager,) {
        const result = this.employeMetierService.effectifEmployeByStatutMatrimonial(manager);

        return result;
    }

}
