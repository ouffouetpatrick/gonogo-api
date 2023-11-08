import { DatabaseModule } from '../../database/database.module';
import { Module } from '@nestjs/common';
import { EmployeMetierController } from './employe.controller';
import { EmployeMetierService } from './employe.service';

@Module({
    imports: [
        DatabaseModule
    ],
    controllers: [EmployeMetierController],
    providers: [EmployeMetierService],
    exports: [EmployeMetierService],
})
export class EmployeMetierModule {}
