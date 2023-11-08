import {Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import { DefaultEntity } from '../../core/shared/systems/default.entity';
import { EntrepriseEntity } from '../entreprise/entreprise.entity';
import { TypePieceEntity } from '../type-piece/type-piece.entity';
import { StatutMatrimonialEntity } from '../statut-matrimonial/statut-matrimonial.entity';
import { MetierEmployeEntity } from '../metier-employe/metier-employe.entity';

@Entity('employe_emp')
@Index('fk_idusrcreation_idx',['idusrcreation'])

export class EmployeEntity {

@PrimaryGeneratedColumn (DefaultEntity.convertDataType({ type: 'integer', name:'id_emp', length: 11, scale: 0, primary:true, nullable: false, unique: true  }))
id : number;

@Column (DefaultEntity.convertDataType({ type: 'varchar' , name:'nom_emp', length: 100, scale: 0, nullable: false, unique: false  }))
nom : string;

@Column (DefaultEntity.convertDataType({ type: 'varchar' , name:'prenom_emp', length: 100, scale: 0, nullable: true, unique: false  }))
prenom : string;

@Column (DefaultEntity.convertDataType({ type: 'integer' , name:'sexe_emp', length: 100, scale: 0, nullable: true, unique: false  }))
sexe : number;

@Column (DefaultEntity.convertDataType({ type: 'varchar' , name:'date_naissance_emp', length: 100, scale: 0, nullable: true, unique: false  }))
dateNaissance : string;

@Column (DefaultEntity.convertDataType({ type: 'varchar' , name:'numero_piece_emp', length: 100, scale: 0, nullable: true, unique: false  }))
numeroPiece : string;

@Column (DefaultEntity.convertDataType({ type: 'varchar' , name:'contact1_emp', length: 100, scale: 0, nullable: true, unique: false  }))
contact1 : string;

@Column (DefaultEntity.convertDataType({ type: 'varchar' , name:'contact2_emp', length: 100, scale: 0, nullable: true, unique: false  }))
contact2 : string;

@Column (DefaultEntity.convertDataType({ type: 'varchar' , name:'specialite_metier_emp', length: 100, scale: 0, nullable: true, unique: false  }))
specialiteMetier : string;

@Column (DefaultEntity.convertDataType({ type: 'integer' , name:'profession_anterieur_emp', length: 100, scale: 0, nullable: true, unique: false  }))
professionAnterieur : number;

// Recuperer le metier en fonction du chiffre se trouvant dans le champ
// professionAnterieur qui fait reference à l'id du metier
@ManyToOne(type => MetierEmployeEntity, metierEmploye => metierEmploye.id, {  onDelete: 'NO ACTION', onUpdate: 'NO ACTION' })
@JoinColumn({ name: 'profession_anterieur_emp'})
metierEmploye1 : MetierEmployeEntity;

@Column (DefaultEntity.convertDataType({ type: 'integer' , name:'annee_experience_poste_emp', length: 100, scale: 0, nullable: true, unique: false  }))
anneeExperiencePoste : number;

@Column (DefaultEntity.convertDataType({ type: 'integer' , name:'annee_experience_poste_anterieur_emp', length: 100, scale: 0, nullable: true, unique: false  }))
anneeExperiencePosteAnterieur : number;

@Column (DefaultEntity.convertDataType({ type: 'integer' , name:'nombre_enfant_emp', length: 100, scale: 0, nullable: true, unique: false  }))
nombreEnfant : number;

@Column (DefaultEntity.convertDataType({ type: 'varchar' , name:'residence_permanent_emp', length: 100, scale: 0, nullable: true, unique: false  }))
residencePermanent : string;

@Column (DefaultEntity.convertDataType({ type: 'varchar' , name:'residence_actuel_emp', length: 100, scale: 0, nullable: true, unique: false  }))
residenceActuel : string;

@Column (DefaultEntity.convertDataType({ type: 'varchar' , name:'empty1_emp', length: 100, scale: 0, nullable: true, unique: false  }))
empty1 : string;

@Column (DefaultEntity.convertDataType({ type: 'varchar' , name:'empty2_emp', length: 100, scale: 0, nullable: true, unique: false  }))
empty2 : string;

@Column (DefaultEntity.convertDataType({ type: 'varchar' , name:'empty3_emp', length: 100, scale: 0, nullable: true, unique: false  }))
empty3 : string;

@Column (DefaultEntity.convertDataType({ type: 'integer' , name:'geler_emp', length: 100, scale: 0, nullable: false, unique: false  }))
geler : number;

@Column (DefaultEntity.convertDataType({ type: 'timestamp' , name:'date_creation_emp', scale: 0, nullable: true, unique: false  }))
dateCreation : string;

@Column (DefaultEntity.convertDataType({ type: 'integer' , name:'idusrcreation_emp', scale: 0, nullable: true, unique: false  }))
idusrcreation : number;

@ManyToOne(type => EntrepriseEntity, entreprise => entreprise.id, {  nullable: true, primary:false, onDelete: 'RESTRICT', onUpdate: 'CASCADE' })
@JoinColumn({ name: 'entreprise_emp'})
entreprise : EntrepriseEntity;

@ManyToOne(type => TypePieceEntity, typePiece => typePiece.id, {  nullable: true, primary:false, onDelete: 'RESTRICT', onUpdate: 'CASCADE' })
@JoinColumn({ name: 'type_piece_emp'})
typePiece : TypePieceEntity;

@ManyToOne(type => StatutMatrimonialEntity, statutMatrimonial => statutMatrimonial.id, {  nullable: true, primary:false, onDelete: 'RESTRICT', onUpdate: 'CASCADE' })
@JoinColumn({ name: 'statut_matrimonial_emp'})
statutMatrimonial : StatutMatrimonialEntity;

@ManyToOne(type => MetierEmployeEntity, metierEmploye => metierEmploye.id, {  nullable: true, primary:false, onDelete: 'RESTRICT', onUpdate: 'CASCADE' })
@JoinColumn({ name: 'metier_employe_emp'})
metierEmploye : MetierEmployeEntity;

//Ce constructor, permet d'iniatialiser EmployeEntity
//Dans metier/EmployeService
constructor(init?: Partial<any>) {
    Object.assign(this, init);
}

}
