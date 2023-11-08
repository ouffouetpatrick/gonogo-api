import { EntrepriseDto } from '../entreprise/entreprise.dto';
import { IsString, IsInt, IsOptional, IsEmail, Length } from 'class-validator';
import { TypePieceDto } from '../type-piece/type-piece.dto';
import { StatutMatrimonialDto } from '../statut-matrimonial/statut-matrimonial.dto';
import { MetierEmployeDto } from '../metier-employe/metier-employe.dto';


export class EmployeDto {

    @IsOptional()
    @IsInt()
    readonly id: number;

    @IsString()
    readonly nom : string;

    @IsString()
    readonly prenom : string;

    @IsInt()
    readonly sexe : number;

    @IsString()
    readonly dateNaissance : string;

    @IsString()
    readonly numeroPiece : string;

    @IsString()
    readonly contact1 : string;

    @IsOptional()
    @IsString()
    readonly contact2 : string;

    @IsString()
    readonly specialiteMetier : string;

    @IsInt()
    readonly professionAnterieur : number;

    @IsInt()
    readonly anneeExperiencePoste : number;

    @IsInt()
    readonly anneeExperiencePosteAnterieur : number;

    @IsInt()
    readonly nombreEnfant : number;

    @IsString()
    readonly residencePermanent : string;

    @IsString()
    readonly residenceActuel : string;

    @IsOptional()
    @IsString()
    readonly empty1 : string;

    @IsOptional()
    @IsString()
    readonly empty2 : string;

    @IsOptional()
    @IsString()
    readonly empty3 : string;

    @IsInt()
    readonly geler : number;

    @IsString()
    readonly dateCreation : string;

    @IsInt()
    readonly idusrcreation : number;

    //@ManyToOne
    @IsOptional()
    readonly entreprise: EntrepriseDto;

    //@ManyToOne
    @IsOptional()
    readonly typePiece: TypePieceDto;

    //@ManyToOne
    @IsOptional()
    readonly statutMatrimonial: StatutMatrimonialDto;

    //@ManyToOne
    @IsOptional()
    readonly metierEmploye: MetierEmployeDto;

}