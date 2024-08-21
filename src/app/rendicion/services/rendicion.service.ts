import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map, of } from "rxjs";
import { Rendicion } from "../models/rendicion";
import { Banco } from "../../bancos/models/banco";
import { Producto } from "../../productos/models/producto";
import { OtroIngreso } from "../models/otroIngreso";
import { RendicionConTransferencia } from "../models/rendicionConTransferencia";
import { RendicionCuentaDni } from "../models/rendicionCuentaDni";
import { RendicionMercadoPago } from "../models/rendicionMercadoPago";
import { RendicionTDTC } from "../models/rendicionTDTC";
import { RendicionCheque } from "../models/rendicionCheque";
import { RendicionOtros } from "../models/rendicionOtros";
import { RendicionYPF } from "../models/rendicionYPF";
import { Egreso } from "../models/egreso";
import { IngresoACuenta } from "../models/ingresoACuenta";

@Injectable({
    providedIn:'root'
})
export class RendicionService{

    private rendiciones : Rendicion[] = []
    constructor(private http: HttpClient){
        
    }

    crearRendicion(rendicion:Rendicion):Observable<string>{
        return this.http.post<string>('http://localhost:8080/dugas/guardarRendicion',rendicion);
    }

    listarRendiciones():Observable<Rendicion[]>{

        return this.http.get<any[]>('http://localhost:8080/dugas/listarRendiciones').pipe(
            map(response=>{
                return response.map(rendicionDto=>{
                    return {
                        id:rendicionDto.id,
                        fechaRendicion:rendicionDto.fechaRendicion,
                        legajo:rendicionDto.legajo,
                        legajoAcom:rendicionDto.legajoAcom,
                        movil:rendicionDto.movil,
                        ventaContado : rendicionDto.ventaContado,
                        ventaCuentaCorriente : rendicionDto.ventaCuentaCorriente,
                        ventaTransferencia:rendicionDto.ventaTransferencia,
                        ventaCuentaDNI:rendicionDto.ventaCuentaDNI,
                        ventaMercadoPago:rendicionDto.ventaMercadoPago,
                        ventaTarjetaCredito:rendicionDto.ventaTarjetaCredito,
                        ventaTarjetaDebido:rendicionDto.ventaTarjetaDebido,
                        ventaAppYPF:rendicionDto.ventaAppYPF,
                        ventaCheques:rendicionDto.ventaCheques,
                        ventaOtros:rendicionDto.ventaOtros,
                        totalEfectivo:rendicionDto.totalEfectivo,
                        totalNoEfectivo:rendicionDto.totalNoEfectivo,
                        productos: [],
                        otrosIngresos : [],
                        transferencias: [],
                        cuentaDNI: [],
                        mercadoPago: [],
                        tarjetaCreditoDebito : [],
                        otros: [],
                        appYpf:[],
                        cheques:[],
                        rendicionBilletes:[],
                        egresos : [],
                        ingresoACuentaEmisor : [],
                        ingresoACuentaDestino : []
                    }
                })
            })
        );
    }

    listarIngresoACuenta():Observable<IngresoACuenta[]>{
        return this.http.get<any[]>('http://localhost:8080/dugas/listarIngresoACuenta').pipe(
            map(response=>{
                return response.map(ingresoACuentaDto=>{
                    return {
                        id:ingresoACuentaDto.id,
                        cliente:ingresoACuentaDto.cliente,
                        concepto:ingresoACuentaDto.concepto,
                        observacion:ingresoACuentaDto.observacion,
                        importe:ingresoACuentaDto.importe,
                        fechaRendicion:ingresoACuentaDto.rendicionEmisora.fechaRendicion
                    }
                })
            })
        )
    }

    buscarRendicion(id:number):Observable<Rendicion>{
        return this.http.get<any>('http://localhost:8080/dugas/buscarRendicion/'+id).pipe(
            
        );
        
    }

    
}