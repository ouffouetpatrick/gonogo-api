
import { UtilisateurProfilEntity } from './../utilisateur-profil/utilisateur-profil.entity';
import {Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import { DefaultEntity } from '../../core/shared/systems/default.entity';
import { UtilisateurModuleDroitEntity } from '../utilisateur-module-droit/utilisateur-module-droit.entity';
import { EntrepriseEntity } from '../entreprise/entreprise.entity';

@Entity('utilisateur_usr')
@Index('fk_idusrcreation_idx',['idusrcreation'])

export class UtilisateurEntity { 


@PrimaryGeneratedColumn (DefaultEntity.convertDataType({ type: 'integer', name:'id_usr', length: 11, scale: 0, primary:true, nullable: false, unique: true  }))
id : number;

@Column (DefaultEntity.convertDataType({ type: 'varchar' , name:'nom_usr', length: 100, scale: 0, nullable: false, unique: false  }))
nom : string;

@Column (DefaultEntity.convertDataType({ type: 'varchar' , name:'prenom_usr', length: 100, scale: 0, nullable: true, unique: false  }))
prenom : string;

@Column (DefaultEntity.convertDataType({ type: 'varchar' , name:'pseudo_usr', length: 100, scale: 0, nullable: true, unique: false  }))
pseudo : string;

@Column (DefaultEntity.convertDataType({ type: 'varchar' , name:'email_usr', length: 100, scale: 0, nullable: true, unique: true  }))
email : string;

@Column (DefaultEntity.convertDataType({ type: 'varchar' , name:'mot_passe_usr', length: 100, scale: 0, nullable: false, unique: false  }))
motDePasse : string;

@Column (DefaultEntity.convertDataType({ type: 'varchar' , name:'contact_usr', length: 100, scale: 0, nullable: true, unique: false  }))
contact : string;

@Column (DefaultEntity.convertDataType({ type: 'timestamp' , name:'confirmation_email_usr', scale: 0, nullable: true, unique: false  }))
emailConfirmation : Date;


@Column (DefaultEntity.convertDataType({ type: 'varchar' , name:'empty1_usr', length: 100, scale: 0, nullable: true, unique: false  }))
empty1 : string;

@Column (DefaultEntity.convertDataType({ type: 'varchar' , name:'empty2_usr', length: 100, scale: 0, nullable: true, unique: false  }))
empty2 : string;

@Column (DefaultEntity.convertDataType({ type: 'varchar' , name:'empty3_usr', length: 100, scale: 0, nullable: true, unique: false  }))
empty3 : string;

@Column (DefaultEntity.convertDataType({ type: 'integer' , name:'geler_usr', length: 100, scale: 0, nullable: false, unique: false  }))
geler : number;

@Column (DefaultEntity.convertDataType({ type: 'timestamp' , name:'date_creation_usr', scale: 0, nullable: true, unique: false  }))
dateCreation : Date;

@Column (DefaultEntity.convertDataType({ type: 'integer' , name:'idusrcreation_usr', scale: 0, nullable: true, unique: false  }))
idusrcreation : number;

@OneToMany(type => UtilisateurProfilEntity, utilisateurProfil => utilisateurProfil.utilisateur, {onDelete: 'NO ACTION', onUpdate: 'NO ACTION' })
utilisateurProfil : UtilisateurProfilEntity[];

@OneToMany(type => UtilisateurModuleDroitEntity, utilisateurProfil => utilisateurProfil.utilisateur, {onDelete: 'NO ACTION', onUpdate: 'NO ACTION' })
utilisateurModuleDroit : UtilisateurModuleDroitEntity[];

@ManyToOne(type => EntrepriseEntity, entreprise => entreprise.utilisateur, {  nullable: true, primary:false, onDelete: 'RESTRICT', onUpdate: 'CASCADE' })
@JoinColumn({ name: 'entreprise_usr'})
entreprise : EntrepriseEntity;

constructor(init?: Partial<any>) {
    Object.assign(this, init);
    }
}
