import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { EgresoModel } from "../models/egreso";
import { format } from "date-fns";

@Injectable({
    providedIn:'root'
})
export class EgresoService{
    constructor(private http: HttpClient){}

    guardarEgreso(egreso:EgresoModel):Observable<string>{
        return this.http.post<string>('http://localhost:8080/dugas/guardarEgreso',egreso);
    }

    listarEgresos():Observable<EgresoModel[]>{
        return this.http.get<any[]>("http://localhost:8080/dugas/listarEgresos").pipe(
            map(response=>{
                return response.map(egresoDTO=>{
                    return {
                        id:egresoDTO.id,
                        fecha:format(new Date(egresoDTO.fecha), 'dd/MM/yyyy'),
                        descripcion:egresoDTO.descripcion,
                        importe:egresoDTO.importe,
                        detalleEgreso:egresoDTO.detalleEgreso
                    }
                    
                }

                );
            })
        );
    }
}