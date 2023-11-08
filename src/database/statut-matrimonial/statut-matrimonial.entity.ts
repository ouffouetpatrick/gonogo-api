import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { DefaultEntity } from '../../core/shared/systems/default.entity';
import { EmployeEntity } from '../employe/employe.entity';

@Entity('statut_matrimonial_stm')
@Index('fx_idusrcreation_idx', ['idusrcreation'])
export class StatutMatrimonialEntity {
 
  @PrimaryGeneratedColumn (DefaultEntity.convertDataType({ type: 'integer', name:'id_stm', length: 11, scale: 0, primary:true, nullable: false, unique: true  }))
  id : number;

  @Column (DefaultEntity.convertDataType({ type: 'varchar' , name:'libelle_stm', length: 100, scale: 0, nullable: true, unique: false  }))
  libelle : string;

  @Column (DefaultEntity.convertDataType({ type: 'varchar' , name:'empty1_stm', length: 100, scale: 0, nullable: true, unique: false  }))
  empty1 : string;

  @Column (DefaultEntity.convertDataType({ type: 'varchar' , name:'empty2_stm', length: 100, scale: 0, nullable: true, unique: false  }))
  empty2 : string;

  @Column (DefaultEntity.convertDataType({ type: 'varchar' , name:'empty3_stm', length: 100, scale: 0, nullable: true, unique: false  }))
  empty3 : string;

  @Column (DefaultEntity.convertDataType({ type: 'integer' , name:'geler_stm', length: 100, scale: 0, nullable: false, unique: false  }))
  geler : number;

  @Column (DefaultEntity.convertDataType({ type: 'timestamp' , name:'date_creation_stm', scale: 0, nullable: false, unique: false  }))
  dateCreation : Date;

  @Column (DefaultEntity.convertDataType({ type: 'integer' , name:'idusrcreation_stm', scale: 0, nullable: true, unique: false  }))
  idusrcreation : number;

  @OneToMany(type => EmployeEntity, employe => employe.statutMatrimonial, {onDelete: 'RESTRICT', onUpdate: 'CASCADE' })
  employe : EmployeEntity[];

  constructor(init?: Partial<any>) {
    Object.assign(this, init);
  }
}
