import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, map } from "rxjs";
import { Concepto } from "../models/concepto";

@Injectable({
    providedIn:'root'
})

export class ConceptoService{
    private  baseUrl:string = "http://localhost:8080/dugas/";
    constructor(private http : HttpClient){}

    listarConceptos():Observable<Concepto[]>{
        return this.http.get<any[]>(this.baseUrl+"listarConcepto").pipe(
            map(response=> {
                return response.map(conceptoDto=>{
                    return {
                        id:conceptoDto.id,
                        nombre:conceptoDto.nombre,
                        ingreso:conceptoDto.ingreso,
                        egreso:conceptoDto.egreso,
                        rubro:conceptoDto.rubro
                    }
                })
            })
        );
    }

    crearConcepto(concepto:Concepto):Observable<string>{
        return this.http.post<string>(this.baseUrl+"crearConcepto",concepto);
    }

    eliminarConcepto(id:number):Observable<string>{
        return this.http.delete<string>(this.baseUrl+"eliminarConcepto/"+id);
    }
}