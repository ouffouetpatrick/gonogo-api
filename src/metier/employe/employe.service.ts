import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { EmployeEntity } from 'src/database/employe/employe.entity';


@Injectable()
export class EmployeMetierService {

    async ajouterEmploye(manager: EntityManager, employe: any, files:any){
          console.log( employe, ' employe');
          
        //Formater la dateNaissance
        const moment = require('moment');
        const dateNaissanceFormate = moment(employe.dateNaissance, 'ddd MMM DD YYYY HH:mm:ss [GMT]Z').format('YYYY-MM-DD');

        let employeEntity = new EmployeEntity({
          id : null,
          nom : employe.nom,
          prenom : employe.prenom,
          sexe : employe.sexe,
          dateNaissance : dateNaissanceFormate,
          numeroPiece : employe.numeroPiece,
          contact1 : employe.contact1,
          contact2 : employe.contact2,
          specialiteMetier : employe.specialiteMetier,
          professionAnterieur : employe.professionAnterieur,
          anneeExperiencePoste : employe.anneeExperiencePoste,
          anneeExperiencePosteAnterieur: employe.anneeExperiencePosteAnterieur,
          nombreEnfant: employe.nombreEnfant,
          residencePermanent : employe.residencePermanent,
          residenceActuel : employe.residenceActuel,
          empty1 : files[0].filename,
          empty2 : employe.empty2,
          empty3 : employe.empty2,
          geler : employe.geler,
          dateCreation : new Date(),
          idusrcreation : employe.idusrcreation,
          entreprise : JSON.parse(employe.entreprise),
          typePiece : JSON.parse(employe.typePiece),
          statutMatrimonial : JSON.parse(employe.statutMatrimonial),
          metierEmploye : JSON.parse(employe.metierEmploye),
        });
        
        console.log(employeEntity, 'employeEntity');
        
      const result = await manager.save(employeEntity);
        return result;
    }

    // async recupererEmploye(manager: EntityManager) {
    //     const listeEmploye = await manager
    //       .createQueryBuilder(EmployeEntity, 'employe')
    //       .select([
    //         'employe', 

    //         'entreprise', 

    //         'typePiece.id',
    //         'typePiece.libelle',

    //         'statutMatrimonial.id',
    //         'statutMatrimonial.libelle',

    //         'metierEmploye.id',
    //         'metierEmploye.libelle',
    //       ])
    //       .leftJoin('employe.entreprise', 'entreprise')
    //       .leftJoin('employe.typePiece', 'typePiece')
    //       .leftJoin('employe.statutMatrimonial', 'statutMatrimonial')
    //       .leftJoin('employe.metierEmploye', 'metierEmploye')
    //       .where('employe.geler=0')
    //       .getMany();

    //     return listeEmploye;
    // }

    async supprimerEmploye(manager: EntityManager, employe: any){
        let employeEntity = new EmployeEntity({
            ...employe,
            geler: 1,
        });
        
        employeEntity = await manager.save(employeEntity);
        return employeEntity;
    }

    async rechercherByDay(manager: EntityManager, query: any) {
        const listeEmploye = await manager
          .createQueryBuilder(EmployeEntity, 'employe')
          .select([
            'employe', 

            'entreprise', 

            'typePiece.id',
            'typePiece.libelle',

            'statutMatrimonial.id',
            'statutMatrimonial.libelle',

            'metierEmploye.id',
            'metierEmploye.libelle',
          ])
          .leftJoin('employe.entreprise', 'entreprise')
          .leftJoin('employe.typePiece', 'typePiece')
          .leftJoin('employe.statutMatrimonial', 'statutMatrimonial')
          .leftJoin('employe.metierEmploye', 'metierEmploye')
          if(query.entreprise == 'All' && query.metier == 'All' && query.agent == 'All'){
            listeEmploye
            .where('TO_DAYS(employe.dateCreation)=TO_DAYS(:datevisite)', { datevisite: query.dateJour })
            .andWhere('employe.geler=0');
          } else if (query.metier == 'All' && query.agent == 'All'){
            listeEmploye
            .where('TO_DAYS(employe.dateCreation)=TO_DAYS(:datevisite)', { datevisite: query.dateJour })
            .andWhere('employe.entreprise=:entreprise', { entreprise: query.entreprise })
            .andWhere('employe.geler=0');
          } else if(query.entreprise == 'All' && query.agent == 'All'){
            listeEmploye
            .where('TO_DAYS(employe.dateCreation)=TO_DAYS(:datevisite)', { datevisite: query.dateJour })
            .andWhere('employe.metierEmploye=:metier', { metier: query.metier })
            .andWhere('employe.geler=0');
          } else if(query.entreprise == 'All' && query.metier == 'All'){
            listeEmploye
            .where('TO_DAYS(employe.dateCreation)=TO_DAYS(:datevisite)', { datevisite: query.dateJour })
            .andWhere('employe.idusrcreation=:idusrcreation', { idusrcreation: query.agent })
            .andWhere('employe.geler=0');
          } else if(query.agent == 'All'){
            listeEmploye
            .where('TO_DAYS(employe.dateCreation)=TO_DAYS(:datevisite)', { datevisite: query.dateJour })
            .andWhere('employe.metierEmploye=:metier', { metier: query.metier })
            .andWhere('employe.entreprise=:entreprise', { entreprise: query.entreprise })
            .andWhere('employe.geler=0');
          } else if(query.metier == 'All'){
            listeEmploye
            .where('TO_DAYS(employe.dateCreation)=TO_DAYS(:datevisite)', { datevisite: query.dateJour })
            .andWhere('employe.entreprise=:entreprise', { entreprise: query.entreprise })
            .andWhere('employe.idusrcreation=:idusrcreation', { idusrcreation: query.agent })
            .andWhere('employe.geler=0');
          } else if(query.entreprise == 'All'){
            listeEmploye
            .where('TO_DAYS(employe.dateCreation)=TO_DAYS(:datevisite)', { datevisite: query.dateJour })
            .andWhere('employe.metierEmploye=:metier', { metier: query.metier })
            .andWhere('employe.idusrcreation=:idusrcreation', { idusrcreation: query.agent })
            .andWhere('employe.geler=0');
          } else {
            listeEmploye
            .where('TO_DAYS(employe.dateCreation)=TO_DAYS(:datevisite)', { datevisite: query.dateJour })
            .andWhere('employe.metierEmploye=:metier', { metier: query.metier })
            .andWhere('employe.entreprise=:entreprise', { entreprise: query.entreprise })
            .andWhere('employe.idusrcreation=:idusrcreation', { idusrcreation: query.agent })
            .andWhere('employe.geler=0');
          }
          
        const rechercherByDay = listeEmploye.getMany();
        return rechercherByDay;
    }

    async rechercherByWeek(manager: EntityManager, query: any) {
        const listeEmploye = await manager
          .createQueryBuilder(EmployeEntity, 'employe')
          .select([
            'employe', 

            'entreprise', 

            'typePiece.id',
            'typePiece.libelle',

            'statutMatrimonial.id',
            'statutMatrimonial.libelle',

            'metierEmploye.id',
            'metierEmploye.libelle',
          ])
          .leftJoin('employe.entreprise', 'entreprise')
          .leftJoin('employe.typePiece', 'typePiece')
          .leftJoin('employe.statutMatrimonial', 'statutMatrimonial')
          .leftJoin('employe.metierEmploye', 'metierEmploye')
          if(query.entreprise == 'All' && query.metier == 'All' && query.agent == 'All'){
            listeEmploye
            .where(
              'TO_DAYS(employe.dateCreation) BETWEEN TO_DAYS(:dateDebut) AND TO_DAYS(:dateFin)',
              { dateDebut: query.dateDebut, dateFin: query.dateFin },
            )
            .andWhere('employe.geler=0');
          } else if (query.metier == 'All' && query.agent == 'All'){
            listeEmploye
            .where(
              'TO_DAYS(employe.dateCreation) BETWEEN TO_DAYS(:dateDebut) AND TO_DAYS(:dateFin)',
              { dateDebut: query.dateDebut, dateFin: query.dateFin },
            )
            .andWhere('employe.entreprise=:entreprise', { entreprise: query.entreprise })
            .andWhere('employe.geler=0');
          } else if(query.entreprise == 'All' && query.agent == 'All'){
            listeEmploye
            .where(
              'TO_DAYS(employe.dateCreation) BETWEEN TO_DAYS(:dateDebut) AND TO_DAYS(:dateFin)',
              { dateDebut: query.dateDebut, dateFin: query.dateFin },
            )
            .andWhere('employe.metierEmploye=:metier', { metier: query.metier })
            .andWhere('employe.geler=0');
          } else if(query.entreprise == 'All' && query.metier == 'All'){
            listeEmploye
            .where(
              'TO_DAYS(employe.dateCreation) BETWEEN TO_DAYS(:dateDebut) AND TO_DAYS(:dateFin)',
              { dateDebut: query.dateDebut, dateFin: query.dateFin },
            )
            .andWhere('employe.idusrcreation=:idusrcreation', { idusrcreation: query.agent })
            .andWhere('employe.geler=0');
          } else if(query.agent == 'All'){
            listeEmploye
            .where(
              'TO_DAYS(employe.dateCreation) BETWEEN TO_DAYS(:dateDebut) AND TO_DAYS(:dateFin)',
              { dateDebut: query.dateDebut, dateFin: query.dateFin },
            )
            .andWhere('employe.metierEmploye=:metier', { metier: query.metier })
            .andWhere('employe.entreprise=:entreprise', { entreprise: query.entreprise })
            .andWhere('employe.geler=0');
          } else if(query.metier == 'All'){
            listeEmploye
            .where(
              'TO_DAYS(employe.dateCreation) BETWEEN TO_DAYS(:dateDebut) AND TO_DAYS(:dateFin)',
              { dateDebut: query.dateDebut, dateFin: query.dateFin },
            )
            .andWhere('employe.entreprise=:entreprise', { entreprise: query.entreprise })
            .andWhere('employe.idusrcreation=:idusrcreation', { idusrcreation: query.agent })
            .andWhere('employe.geler=0');
          } else if(query.entreprise == 'All'){
            listeEmploye
            .where(
              'TO_DAYS(employe.dateCreation) BETWEEN TO_DAYS(:dateDebut) AND TO_DAYS(:dateFin)',
              { dateDebut: query.dateDebut, dateFin: query.dateFin },
            )
            .andWhere('employe.metierEmploye=:metier', { metier: query.metier })
            .andWhere('employe.idusrcreation=:idusrcreation', { idusrcreation: query.agent })
            .andWhere('employe.geler=0');
          } else {
            listeEmploye
            .where(
              'TO_DAYS(employe.dateCreation) BETWEEN TO_DAYS(:dateDebut) AND TO_DAYS(:dateFin)',
              { dateDebut: query.dateDebut, dateFin: query.dateFin },
            )
            .andWhere('employe.metierEmploye=:metier', { metier: query.metier })
            .andWhere('employe.entreprise=:entreprise', { entreprise: query.entreprise })
            .andWhere('employe.idusrcreation=:idusrcreation', { idusrcreation: query.agent })
            .andWhere('employe.geler=0');
          }
          
        const rechercherByWeek = listeEmploye.getMany();
        return rechercherByWeek;
    }

    async rechercherByMonth(manager: EntityManager, query: any) {
        const listeEmploye = await manager
          .createQueryBuilder(EmployeEntity, 'employe')
          .select([
            'employe', 

            'entreprise', 

            'typePiece.id',
            'typePiece.libelle',

            'statutMatrimonial.id',
            'statutMatrimonial.libelle',

            'metierEmploye.id',
            'metierEmploye.libelle',
          ])
          .leftJoin('employe.entreprise', 'entreprise')
          .leftJoin('employe.typePiece', 'typePiece')
          .leftJoin('employe.statutMatrimonial', 'statutMatrimonial')
          .leftJoin('employe.metierEmploye', 'metierEmploye')
          if(query.entreprise == 'All' && query.metier == 'All' && query.agent == 'All'){
            listeEmploye
            .where('EXTRACT(YEAR FROM employe.dateCreation)=:annee', {
              annee: query.annee,
            })
            .andWhere('EXTRACT(MONTH FROM employe.dateCreation)=:mois', {
              mois: query.mois,
            })
            .andWhere('employe.geler=0');
          } else if (query.metier == 'All' && query.agent == 'All'){
            listeEmploye
            .where('EXTRACT(YEAR FROM employe.dateCreation)=:annee', {
              annee: query.annee,
            })
            .andWhere('EXTRACT(MONTH FROM employe.dateCreation)=:mois', {
              mois: query.mois,
            })
            .andWhere('employe.entreprise=:entreprise', { entreprise: query.entreprise })
            .andWhere('employe.geler=0');
          } else if(query.entreprise == 'All' && query.agent == 'All'){
            listeEmploye
            .where('EXTRACT(YEAR FROM employe.dateCreation)=:annee', {
              annee: query.annee,
            })
            .andWhere('EXTRACT(MONTH FROM employe.dateCreation)=:mois', {
              mois: query.mois,
            })
            .andWhere('employe.metierEmploye=:metier', { metier: query.metier })
            .andWhere('employe.geler=0');
          } else if(query.entreprise == 'All' && query.metier == 'All'){
            listeEmploye
            .where('EXTRACT(YEAR FROM employe.dateCreation)=:annee', {
              annee: query.annee,
            })
            .andWhere('EXTRACT(MONTH FROM employe.dateCreation)=:mois', {
              mois: query.mois,
            })
            .andWhere('employe.idusrcreation=:idusrcreation', { idusrcreation: query.agent })
            .andWhere('employe.geler=0');
          } else if(query.agent == 'All'){
            listeEmploye
            .where('EXTRACT(YEAR FROM employe.dateCreation)=:annee', {
              annee: query.annee,
            })
            .andWhere('EXTRACT(MONTH FROM employe.dateCreation)=:mois', {
              mois: query.mois,
            })
            .andWhere('employe.metierEmploye=:metier', { metier: query.metier })
            .andWhere('employe.entreprise=:entreprise', { entreprise: query.entreprise })
            .andWhere('employe.geler=0');
          } else if(query.metier == 'All'){
            listeEmploye
            .where('EXTRACT(YEAR FROM employe.dateCreation)=:annee', {
              annee: query.annee,
            })
            .andWhere('EXTRACT(MONTH FROM employe.dateCreation)=:mois', {
              mois: query.mois,
            })
            .andWhere('employe.entreprise=:entreprise', { entreprise: query.entreprise })
            .andWhere('employe.idusrcreation=:idusrcreation', { idusrcreation: query.agent })
            .andWhere('employe.geler=0');
          } else if(query.entreprise == 'All'){
            listeEmploye
            .where('EXTRACT(YEAR FROM employe.dateCreation)=:annee', {
              annee: query.annee,
            })
            .andWhere('EXTRACT(MONTH FROM employe.dateCreation)=:mois', {
              mois: query.mois,
            })
            .andWhere('employe.metierEmploye=:metier', { metier: query.metier })
            .andWhere('employe.idusrcreation=:idusrcreation', { idusrcreation: query.agent })
            .andWhere('employe.geler=0');
          } else {
            listeEmploye
            .where('EXTRACT(YEAR FROM employe.dateCreation)=:annee', {
              annee: query.annee,
            })
            .andWhere('EXTRACT(MONTH FROM employe.dateCreation)=:mois', {
              mois: query.mois,
            })
            .andWhere('employe.metierEmploye=:metier', { metier: query.metier })
            .andWhere('employe.entreprise=:entreprise', { entreprise: query.entreprise })
            .andWhere('employe.idusrcreation=:idusrcreation', { idusrcreation: query.agent })
            .andWhere('employe.geler=0');
          }
          
        const rechercherByMonth = listeEmploye.getMany();
        return rechercherByMonth;
    }

    async rechercherByYear(manager: EntityManager, query: any) {
        const listeEmploye = await manager
          .createQueryBuilder(EmployeEntity, 'employe')
          .select([
            'employe', 

            'entreprise', 

            'typePiece.id',
            'typePiece.libelle',

            'statutMatrimonial.id',
            'statutMatrimonial.libelle',

            'metierEmploye.id',
            'metierEmploye.libelle',
          ])
          .leftJoin('employe.entreprise', 'entreprise')
          .leftJoin('employe.typePiece', 'typePiece')
          .leftJoin('employe.statutMatrimonial', 'statutMatrimonial')
          .leftJoin('employe.metierEmploye', 'metierEmploye')
          if(query.entreprise == 'All' && query.metier == 'All' && query.agent == 'All'){
            listeEmploye
            .where('EXTRACT(YEAR FROM employe.dateCreation)=:annee', {
              annee: query.annee,
            })
            .andWhere('employe.geler=0');
          } else if (query.metier == 'All' && query.agent == 'All'){
            listeEmploye
            .where('EXTRACT(YEAR FROM employe.dateCreation)=:annee', {
              annee: query.annee,
            })
            .andWhere('employe.entreprise=:entreprise', { entreprise: query.entreprise })
            .andWhere('employe.geler=0');
          } else if(query.entreprise == 'All' && query.agent == 'All'){
            listeEmploye
            .where('EXTRACT(YEAR FROM employe.dateCreation)=:annee', {
              annee: query.annee,
            })
            .andWhere('employe.metierEmploye=:metier', { metier: query.metier })
            .andWhere('employe.geler=0');
          } else if(query.entreprise == 'All' && query.metier == 'All'){
            listeEmploye
            .where('EXTRACT(YEAR FROM employe.dateCreation)=:annee', {
              annee: query.annee,
            })
            .andWhere('employe.idusrcreation=:idusrcreation', { idusrcreation: query.agent })
            .andWhere('employe.geler=0');
          } else if(query.agent == 'All'){
            listeEmploye
            .where('EXTRACT(YEAR FROM employe.dateCreation)=:annee', {
              annee: query.annee,
            })
            .andWhere('employe.metierEmploye=:metier', { metier: query.metier })
            .andWhere('employe.entreprise=:entreprise', { entreprise: query.entreprise })
            .andWhere('employe.geler=0');
          } else if(query.metier == 'All'){
            listeEmploye
            .where('EXTRACT(YEAR FROM employe.dateCreation)=:annee', {
              annee: query.annee,
            })
            .andWhere('employe.entreprise=:entreprise', { entreprise: query.entreprise })
            .andWhere('employe.idusrcreation=:idusrcreation', { idusrcreation: query.agent })
            .andWhere('employe.geler=0');
          } else if(query.entreprise == 'All'){
            listeEmploye
            .where('EXTRACT(YEAR FROM employe.dateCreation)=:annee', {
              annee: query.annee,
            })
            .andWhere('employe.metierEmploye=:metier', { metier: query.metier })
            .andWhere('employe.idusrcreation=:idusrcreation', { idusrcreation: query.agent })
            .andWhere('employe.geler=0');
          } else {
            listeEmploye
            .where('EXTRACT(YEAR FROM employe.dateCreation)=:annee', {
              annee: query.annee,
            })
            .andWhere('employe.metierEmploye=:metier', { metier: query.metier })
            .andWhere('employe.entreprise=:entreprise', { entreprise: query.entreprise })
            .andWhere('employe.idusrcreation=:idusrcreation', { idusrcreation: query.agent })
            .andWhere('employe.geler=0');
          }
          
        const rechercherByYear = listeEmploye.getMany();
        return rechercherByYear;
    }

    async effectifEmploye(manager: EntityManager) {
      const effectif = await manager
        .createQueryBuilder(EmployeEntity, 'employe')
        .select([
          'employe', 
        ])
        // .leftJoin('employe.metierEmploye', 'metierEmploye')
        .where('employe.geler=0')
        .getCount();

      return effectif;
    }

    async effectifEmployeBySexe(manager: EntityManager) {
      const effectifBySexe = await manager
        .createQueryBuilder(EmployeEntity, 'employe')
        .select([
          'employe.sexe As sexe',
          'COUNT(employe.id) As Nombre' 
        ])
        // .leftJoin('employe.metierEmploye', 'metierEmploye')
        .groupBy('employe.sexe')
        .where('employe.geler=0')
        .getRawMany();

      return effectifBySexe;
    }

    async effectifEmployeByStatutMatrimonial(manager: EntityManager) {
      const effectifByStatutMatrimonial = await manager
        .createQueryBuilder(EmployeEntity, 'employe')
        .select([
          'statutMatrimonial.libelle As statutMatrimonial',
          'COUNT(employe.id) As Nombre' 
        ])
        .leftJoin('employe.statutMatrimonial', 'statutMatrimonial')
        .groupBy('statutMatrimonial.id')
        .where('employe.geler=0')
        .getRawMany();

      return effectifByStatutMatrimonial;
    }

}

