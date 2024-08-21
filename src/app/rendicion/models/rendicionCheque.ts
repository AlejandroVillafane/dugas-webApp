import { Banco } from "../../bancos/models/banco";

export class RendicionCheque{
    cliente!:string;
    numeroCheque!:number;
    banco :Banco = new Banco();
    fecha: Date = new Date();
    importe!:number;
}