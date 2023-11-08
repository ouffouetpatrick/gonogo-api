import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CONFIG } from '../app.constant';
import { TypePieceModule } from './type-piece/type-piece.module';
import { StatutMatrimonialModule } from './statut-matrimonial/statut-matrimonial.module';
import { DroitModule } from './droit/droit.module';
import { ModuleModule } from './module/module.module';
import { ModuleDroitModule } from './module-droit/module-droit.module';
import { ProfilModule } from './profil/profil.module';
import { TemplateProfilModule } from './template-profil/template-profil.module';
import { UtilisateurModule } from './utilisateur/utilisateur.module';
import { UtilisateurModuleDroitModule } from './utilisateur-module-droit/utilisateur-module-droit.module';
import { UtilisateurProfilModule } from './utilisateur-profil/utilisateur-profil.module';
import { EntrepriseModule } from './entreprise/entreprise.module';
import { DomaineActiviteModule } from './domaine-activite/domaine-activite.module';
import { StatutJuridiqueModule } from './statut-juridique/statut-juridique.module';
import { EmployeModule } from './employe/employe.module';
import { MetierEmployeModule } from './metier-employe/metier-employe.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(CONFIG().db),
    EmployeModule,
    MetierEmployeModule,
    TypePieceModule,
    DomaineActiviteModule,
    StatutJuridiqueModule,
    StatutMatrimonialModule,
    EntrepriseModule,

    //Admin Module
    DroitModule,
    ModuleModule,
    ModuleDroitModule,
    ProfilModule,
    TemplateProfilModule,
    UtilisateurModule,
    UtilisateurModuleDroitModule,
    UtilisateurProfilModule,

  ],
  providers: [],
  controllers: [],
  exports: [
    EmployeModule,
    MetierEmployeModule,
    TypePieceModule,
    DomaineActiviteModule,
    StatutJuridiqueModule,
    StatutMatrimonialModule,
    EntrepriseModule,

    //Admin Module
    DroitModule,
    ModuleModule,
    ModuleDroitModule,
    ProfilModule,
    TemplateProfilModule,
    UtilisateurModule,
    UtilisateurModuleDroitModule,
    UtilisateurProfilModule,
  ],
})
export class DatabaseModule {}
