import { IsString, IsInt, IsOptional } from 'class-validator';
import { EmployeDto } from '../employe/employe.dto';

export class StatutMatrimonialDto {
  @IsOptional()
  @IsInt()
  readonly id: number;
  
  @IsOptional()
  @IsString()
  readonly libelle: string;
  

  @IsOptional()
  @IsString()
  readonly empty1: string;

  @IsOptional()
  @IsString()
  readonly empty2: string;

  @IsOptional()
  @IsString()
  readonly empty3: string;

  @IsInt()
  readonly geler: number;

  @IsString()
  readonly dateCreation: string;

  @IsInt()
  readonly idusrcreation: number;

  //@OneToMany
  @IsOptional()
  readonly employe: EmployeDto[];
}
