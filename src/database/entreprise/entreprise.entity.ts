import {Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import { DefaultEntity } from '../../core/shared/systems/default.entity';
import { DomaineActiviteEntity } from '../domaine-activite/domaine-activite.entity';
import { StatutJuridiqueEntity } from '../statut-juridique/statut-juridique.entity';
import { UtilisateurEntity } from '../utilisateur/utilisateur.entity';
import { EmployeEntity } from '../employe/employe.entity';

@Entity('entreprise_ent')
@Index('fk_idusrcreation_idx',['idusrcreation'])

export class EntrepriseEntity { 

@PrimaryGeneratedColumn (DefaultEntity.convertDataType({ type: 'integer', name:'id_ent', length: 11, scale: 0, primary:true, nullable: false, unique: true  }))
id : number;

@Column (DefaultEntity.convertDataType({ type: 'varchar' , name:'nom_ent', length: 100, scale: 0, nullable: false, unique: false  }))
nom : string;

@Column (DefaultEntity.convertDataType({ type: 'varchar' , name:'contact_ent', length: 100, scale: 0, nullable: false, unique: false  }))
contact : string;

@Column (DefaultEntity.convertDataType({ type: 'varchar' , name:'localisation_ent', length: 100, scale: 0, nullable: false, unique: false  }))
localisation : string;

@Column (DefaultEntity.convertDataType({ type: 'varchar' , name:'empty1_ent', length: 100, scale: 0, nullable: true, unique: false  }))
empty1 : string;

@Column (DefaultEntity.convertDataType({ type: 'varchar' , name:'empty_ent', length: 100, scale: 0, nullable: true, unique: false  }))
empty2 : string;

@Column (DefaultEntity.convertDataType({ type: 'varchar' , name:'empty3_ent', length: 100, scale: 0, nullable: true, unique: false  }))
empty3 : string;

@Column (DefaultEntity.convertDataType({ type: 'integer' , name:'geler_ent', length: 100, scale: 0, nullable: false, unique: false  }))
geler : number;

@Column (DefaultEntity.convertDataType({ type: 'timestamp' , name:'date_creation_ent', scale: 0, nullable: false, unique: false  }))
dateCreation : Date;

@Column (DefaultEntity.convertDataType({ type: 'integer' , name:'idusrcreation_ent', scale: 0, nullable: true, unique: false  }))
idusrcreation : number;

@ManyToOne(type => DomaineActiviteEntity, domaineActivite => domaineActivite.entreprise, {  nullable: true, primary:false, onDelete: 'RESTRICT', onUpdate: 'CASCADE' })
@JoinColumn({ name: 'domaine_activite_ent'})
domaineActivite : DomaineActiviteEntity;

@ManyToOne(type => StatutJuridiqueEntity, statutJuridique => statutJuridique.entreprise, {  nullable: true, primary:false, onDelete: 'RESTRICT', onUpdate: 'CASCADE' })
@JoinColumn({ name: 'statut_juridique_ent'})
statutJuridique : StatutJuridiqueEntity;

@OneToMany(type => UtilisateurEntity, utilisateur => utilisateur.entreprise, {onDelete: 'RESTRICT', onUpdate: 'CASCADE' })
utilisateur : UtilisateurEntity[];

@OneToMany(type => EmployeEntity, employe => employe.entreprise, {onDelete: 'RESTRICT', onUpdate: 'CASCADE' })
employe : EmployeEntity[];

constructor(init?: Partial<any>) {
    Object.assign(this, init);
    }
}
