import { MedioDePago } from "../../medioDePago/models/medioDePago";

export class Egreso{
    id!:number;
    fecha!:string;
    descripcion!:string;
    importe!:number;
    detalleEgreso!:any[];

    constructor() {
        this.importe = 0;
        this.detalleEgreso = []; // Inicializar el array 'detalle' como un array vacío
    }

    
}