import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { DefaultEntity } from '../../core/shared/systems/default.entity';
import { EmployeEntity } from '../employe/employe.entity';

@Entity('type_piece_typ')
@Index('fx_idusrcreation_idx', ['idusrcreation'])
export class TypePieceEntity {
 
  @PrimaryGeneratedColumn (DefaultEntity.convertDataType({ type: 'integer', name:'id_typ', length: 11, scale: 0, primary:true, nullable: false, unique: true  }))
  id : number;

  @Column (DefaultEntity.convertDataType({ type: 'varchar' , name:'libelle_typ', length: 100, scale: 0, nullable: true, unique: false  }))
  libelle : string;

  @Column (DefaultEntity.convertDataType({ type: 'varchar' , name:'empty1_typ', length: 100, scale: 0, nullable: true, unique: false  }))
  empty1 : string;

  @Column (DefaultEntity.convertDataType({ type: 'varchar' , name:'empty2_typ', length: 100, scale: 0, nullable: true, unique: false  }))
  empty2 : string;

  @Column (DefaultEntity.convertDataType({ type: 'varchar' , name:'empty3_typ', length: 100, scale: 0, nullable: true, unique: false  }))
  empty3 : string;

  @Column (DefaultEntity.convertDataType({ type: 'integer' , name:'geler_typ', length: 100, scale: 0, nullable: false, unique: false  }))
  geler : number;

  @Column (DefaultEntity.convertDataType({ type: 'timestamp' , name:'date_creation_typ', scale: 0, nullable: false, unique: false  }))
  dateCreation : Date;

  @Column (DefaultEntity.convertDataType({ type: 'integer' , name:'idusrcreation_typ', scale: 0, nullable: true, unique: false  }))
  idusrcreation : number;

  @OneToMany(type => EmployeEntity, employe => employe.typePiece, {onDelete: 'RESTRICT', onUpdate: 'CASCADE' })
  employe : EmployeEntity[];

  constructor(init?: Partial<any>) {
    Object.assign(this, init);
  }
}
