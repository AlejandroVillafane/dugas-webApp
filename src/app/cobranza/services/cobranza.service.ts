import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Cobranza } from "../models/cobranza";
import { map, Observable } from "rxjs";
import { format } from "date-fns";
import { Legajo } from "../../legajos/models/legajo";

@Injectable({
    providedIn:'root'
})
export class CobranzaService{
    constructor(private http: HttpClient){}

    guardarCobranza(cobranza:Cobranza):Observable<string>{
        return this.http.post<string>('http://localhost:8080/dugas/guardarCobranza',cobranza);
    }

    listarCobranzas():Observable<Cobranza[]>{
        return this.http.get<any[]>("http://localhost:8080/dugas/listarCobranzas").pipe(
            map(response=>{
                return response.map(cobranzaDTO=>{
                    return {
                        fecha:format(new Date(cobranzaDTO.fecha), 'dd/MM/yyyy'),
                        legajo:{
                            id:cobranzaDTO.legajo.id,
                            numeroLegajo:cobranzaDTO.legajo.numeroLegajo,
                            nombre:cobranzaDTO.legajo.nombre,
                            apellido:cobranzaDTO.legajo.apellido,
                            cuil:cobranzaDTO.legajo.cuil,
                            dni:cobranzaDTO.legajo.dni,
                        },
                        cliente:cobranzaDTO.cliente,
                        importe:cobranzaDTO.importe,
                        recibo:cobranzaDTO.recibo,
                        observacion:cobranzaDTO.observacion
                    }
                }
                    
                );
            }) 
        );
    }
}