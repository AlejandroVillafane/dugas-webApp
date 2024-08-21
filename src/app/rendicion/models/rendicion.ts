import { Legajo } from "../../legajos/models/legajo";
import { Movil } from "../../moviles/models/movil";
import { Producto } from "../../productos/models/producto";
import { Egreso } from "./egreso";
import { IngresoACuenta } from "./ingresoACuenta";
import { OtroIngreso } from "./otroIngreso";
import { RendicionCheque } from "./rendicionCheque";
import { RendicionConTransferencia } from "./rendicionConTransferencia";
import { RendicionCuentaDni } from "./rendicionCuentaDni";
import { RendicionMercadoPago } from "./rendicionMercadoPago";
import { RendicionOtros } from "./rendicionOtros";
import { RendicionProducto } from "./rendicionProducto";
import { RendicionTDTC } from "./rendicionTDTC";
import { RendicionYPF } from "./rendicionYPF";

export class Rendicion{
    id:number = 0;
    fechaRendicion!: Date;
    legajo!:Legajo;
    legajoAcom!:Legajo;
    movil!:Movil;

    productos!: RendicionProducto[];
    otrosIngresos : OtroIngreso[] =[];
    transferencias: RendicionConTransferencia[] = [];
    cuentaDNI: RendicionCuentaDni[] = [];
    mercadoPago: RendicionMercadoPago[] = [];
    tarjetaCreditoDebito : RendicionTDTC[] = [];
    otros: RendicionOtros[] = [];
    appYpf:RendicionYPF[] = [];
    cheques:RendicionCheque[] = [];
    rendicionBilletes:any=[];
    egresos : Egreso[] = [];
    ingresoACuentaEmisor : IngresoACuenta[] = [];
    ingresoACuentaDestino : IngresoACuenta[] = [];

    ventaContado : number = 0;
    ventaCuentaCorriente : number = 0;
    ventaTransferencia:number = 0;
    ventaCuentaDNI:number=0;
    ventaMercadoPago:number=0;
    ventaTarjetaCredito:number=0;
    ventaTarjetaDebido:number =0;
    ventaAppYPF:number=0;
    ventaCheques:number=0;
    ventaOtros:number=0;
    totalEfectivo:number = 0;
    totalNoEfectivo:number=0;
    
   
}