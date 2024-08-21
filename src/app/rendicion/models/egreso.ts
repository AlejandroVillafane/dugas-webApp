import { Concepto } from "../../conceptos/models/concepto";

export class Egreso{
    tipoComprobante!:string;
    numeroComprobante! : number;
    proveedor!:string;
    conceptoPago!:Concepto;
    observacion!:string;
    importe!:number;
}