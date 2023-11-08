import { ModuleEntity } from './../../database/module/module.entity';
import { TemplateProfilEntity } from './../../database/template-profil/template-profil.entity';
import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import * as bcrypt from 'bcrypt'
import { EntrepriseEntity } from 'src/database/entreprise/entreprise.entity';

@Injectable()
export class EntrepriseMetierService {


    async AjouterEntreprise(manager: EntityManager, entreprise: any){
        let entrepriseEntity = new EntrepriseEntity({
            ...entreprise
        });
        
        entrepriseEntity = await manager.save(entrepriseEntity);
        return entrepriseEntity;
    }

    async recupererEntreprise(manager: EntityManager) {
        const listeEntreprise = await manager
          .createQueryBuilder(EntrepriseEntity, 'entreprise')
          .select([
            'entreprise', 
            'statutJuridique.id', 
            'statutJuridique.libelle', 
            'domaineActivite.id',
            'domaineActivite.libelle'
          ])
          .leftJoin('entreprise.statutJuridique', 'statutJuridique')
          .leftJoin('entreprise.domaineActivite', 'domaineActivite')
          .where('entreprise.geler=0')
          .getMany();

        return listeEntreprise;
      }

      async supprimerEntreprise(manager: EntityManager, entreprise: any){
        let entrepriseEntity = new EntrepriseEntity({
            ...entreprise,
            geler: 1,//Update le gele à 1 (1=supprimé, O=non supprimer)
            dateCreation: new Date().toISOString(),//Update la date pour utiliser la date actuelle
        });
        
        entrepriseEntity = await manager.save(entrepriseEntity);
        return entrepriseEntity;
    }

}

