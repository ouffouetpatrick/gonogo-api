import { DatabaseModule } from '../../database/database.module';
import { Module } from '@nestjs/common';
import { EntrepriseMetierController } from './entreprise.controller';
import { EntrepriseMetierService } from './entreprise.service';

@Module({
    imports: [
        DatabaseModule
    ],
    controllers: [EntrepriseMetierController],
    providers: [EntrepriseMetierService],
    exports: [EntrepriseMetierService],
})
export class EntrepriseMetierModule {}
