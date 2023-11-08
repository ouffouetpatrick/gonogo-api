import { EventsModule } from './gateways/events.module';
import { Module } from '@nestjs/common';
import { FilesModule } from './../files/files.module'
import { UtilisateurMetierModule } from './utilisateur/utilisateur.module';
import { ModuleDroitMetierModule } from './module/module.module';
import { ProfilMetierModule } from './profil/profil.module';
import { UtilisateurProfilMetierModule } from './utilisateur-profil/utilisateur-profil.module';
import { EntrepriseMetierModule } from './entreprise/entreprise.module';
import { EmployeMetierModule } from './employe/employe.module';


@Module({
    imports: [
        EventsModule,
        FilesModule,

        //Metier
        UtilisateurMetierModule,
        ModuleDroitMetierModule,
        ProfilMetierModule,
        UtilisateurProfilMetierModule,

        EntrepriseMetierModule,
        EmployeMetierModule,
    ],
    providers: [],
    controllers: [],
    exports: [],
})
export class MetierModule {}
