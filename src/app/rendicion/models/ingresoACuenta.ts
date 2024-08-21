import { Concepto } from "../../conceptos/models/concepto";

export class IngresoACuenta{
    id!:number;
    cliente!:string;
    concepto!:Concepto;
    observacion!:string;
    importe!:number;
    fechaRendicion!:string;
}