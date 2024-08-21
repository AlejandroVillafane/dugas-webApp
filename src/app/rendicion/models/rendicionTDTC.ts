import { Tarjeta } from "../../tarjetas/models/tarjeta";

export class RendicionTDTC {
    cliente!:string;
    tarjeta: Tarjeta = new Tarjeta();
    importe!:number;
}