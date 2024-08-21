import { Rubro } from "../../rubros/models/rubro";

export class Concepto{
    id!:number;
    nombre!:string;
    ingreso!:boolean;
    egreso!:boolean;
    rubro!:Rubro;
}