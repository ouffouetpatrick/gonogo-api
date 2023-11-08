import { Body, Catch, Controller, Post, UseGuards, UseInterceptors, Get } from '@nestjs/common';
import { ValidationPipe } from '../../core/shared/pipes/validation.pipe';
import { LoggingInterceptor } from '../../core/shared/interceptors/logging.interceptor';
import { Transaction, TransactionManager, EntityManager } from 'typeorm';
import { EntrepriseMetierService } from './entreprise.service';
import { EntrepriseDto } from 'src/database/entreprise/entreprise.dto';
// import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
// import { CurrentUser } from 'src/auth/decorators/current-user.decorator';

@Catch()
// @UseInterceptors(LoggingInterceptor)
@Controller('metier/entreprise')
export class EntrepriseMetierController {
    constructor(
        private readonly entrepriseMetierService: EntrepriseMetierService,
    ) {}

    @Post('ajouterEntreprise')
    // @UseGuards(JwtAuthGuard)
    @Transaction()
    async AjouterEntreprise(@Body(new ValidationPipe()) entrepriseDto: EntrepriseDto,  @TransactionManager() manager: EntityManager) {
        const result = this.entrepriseMetierService.AjouterEntreprise(manager, entrepriseDto);
        
        return result
    }

    @Get('recupererEntreprise')
    // @UseGuards(JwtAuthGuard)
    @Transaction()
    async recupererEntreprise(@TransactionManager() manager: EntityManager,) {
        const result = this.entrepriseMetierService.recupererEntreprise(manager);

        return result;
    }

    @Post('supprimerEntreprise')
    // @UseGuards(JwtAuthGuard)
    @Transaction()
    async supprimerEntreprise(@Body(new ValidationPipe()) entrepriseDto: EntrepriseDto,  @TransactionManager() manager: EntityManager) {
        const result = this.entrepriseMetierService.supprimerEntreprise(manager, entrepriseDto);
        
        return result
    }

}
