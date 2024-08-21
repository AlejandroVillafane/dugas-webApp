import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { TipoEnvase } from "../models/tipoEnvase";

@Injectable({
    providedIn:'root'
})

export class TipoEnvaseService{
    constructor(private http: HttpClient){
    }
    private baseUrl : string = "http://localhost:8080/dugas/";
    private tipoEnvase : TipoEnvase[] = [];

    listarTipoEnvase():Observable<TipoEnvase[]>{
        return this.http.get<any[]>(this.baseUrl+"listarTipoEnvase").pipe(
            map(response=>{
                return response.map(tipoEnvaseDto=>{
                    return {
                        id:tipoEnvaseDto.id,
                        nombre:tipoEnvaseDto.nombre,
                        capacidad:tipoEnvaseDto.capacidad
                    }
                })
            })
        );

    }

    crearTipoEnvase(tipoEnvase:TipoEnvase):Observable<string>{
        return this.http.post<string>(this.baseUrl+"crearTipoEnvase",tipoEnvase);
    }

    eliminarTipoEnvase(id:number):Observable<string>{
        return this.http.delete<string>(this.baseUrl+"eliminarTipoEnvase/"+id);
    }

}