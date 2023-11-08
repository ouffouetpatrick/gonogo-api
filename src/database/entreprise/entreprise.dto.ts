import { IsString, IsInt, IsOptional } from 'class-validator';
import { DomaineActiviteDto } from '../domaine-activite/domaine-activite.dto';
import { StatutJuridiqueDto } from '../statut-juridique/statut-juridique.dto';
import { UtilisateurDto } from '../utilisateur/utilisateur.dto';
import { EmployeDto } from '../employe/employe.dto';

export class EntrepriseDto {


    @IsOptional()
    @IsInt()
    readonly id: number;

    @IsString()
    readonly nom : string;

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
    readonly domaineActivite: DomaineActiviteDto;

    //@ManyToOne
    @IsOptional()
    readonly statutJuridique: StatutJuridiqueDto;

    //@OneToMany
    @IsOptional()
    readonly utilisateur: UtilisateurDto[];

    //@OneToMany
    @IsOptional()
    readonly employe: EmployeDto[];
}