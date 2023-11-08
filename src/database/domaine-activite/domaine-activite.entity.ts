import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { DefaultEntity } from '../../core/shared/systems/default.entity';
import { EntrepriseEntity } from '../entreprise/entreprise.entity';

@Entity('domaine_activite_dac')
@Index('fx_idusrcreation_idx', ['idusrcreation'])
export class DomaineActiviteEntity {
 
  @PrimaryGeneratedColumn (DefaultEntity.convertDataType({ type: 'integer', name:'id_dac', length: 11, scale: 0, primary:true, nullable: false, unique: true  }))
  id : number;

  @Column (DefaultEntity.convertDataType({ type: 'varchar' , name:'libelle_dac', length: 100, scale: 0, nullable: true, unique: false  }))
  libelle : string;

  @Column (DefaultEntity.convertDataType({ type: 'varchar' , name:'empty1_dac', length: 100, scale: 0, nullable: true, unique: false  }))
  empty1 : string;

  @Column (DefaultEntity.convertDataType({ type: 'varchar' , name:'empty2_dac', length: 100, scale: 0, nullable: true, unique: false  }))
  empty2 : string;

  @Column (DefaultEntity.convertDataType({ type: 'varchar' , name:'empty3_dac', length: 100, scale: 0, nullable: true, unique: false  }))
  empty3 : string;

  @Column (DefaultEntity.convertDataType({ type: 'integer' , name:'geler_dac', length: 100, scale: 0, nullable: false, unique: false  }))
  geler : number;

  @Column (DefaultEntity.convertDataType({ type: 'timestamp' , name:'date_creation_dac', scale: 0, nullable: false, unique: false  }))
  dateCreation : Date;

  @Column (DefaultEntity.convertDataType({ type: 'integer' , name:'idusrcreation_dac', scale: 0, nullable: true, unique: false  }))
  idusrcreation : number;

  @OneToMany(type => EntrepriseEntity, entreprise => entreprise.domaineActivite, {onDelete: 'RESTRICT', onUpdate: 'CASCADE' })
  entreprise : EntrepriseEntity[];

  constructor(init?: Partial<any>) {
    Object.assign(this, init);
    }
}
