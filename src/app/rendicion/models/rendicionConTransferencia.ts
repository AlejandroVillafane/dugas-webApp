import { Banco } from "../../bancos/models/banco";

export class RendicionConTransferencia {
    id!:number;
    cliente!:string;
    banco:Banco = new Banco();
    importe!:number;
}