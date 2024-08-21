import { Banco } from "../../bancos/models/banco";

export class Tarjeta{
    id!:number;
    nombre!:string;
    banco!:Banco;
    tipoTarjeta!:string;
}