import { Legajo } from "../../legajos/models/legajo";

export class Cobranza{
    fecha!:string;
    legajo!:Legajo;
    cliente!:string;
    importe!:number;
    recibo!:string;
    observacion!:string;
}