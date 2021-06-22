import { Exchange } from "./exchange";
import { Sector } from "./sector";

export class Company {
    id!: number;
    companyName!: string;
    companyTurnover!: number;
    companyCEO!: string ;
    boardOfDirectors!:string;
    listedExchanges: Exchange[]=[];
    sector!: Sector;
    companyDesc!: string;
}