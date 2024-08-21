import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { TipoProducto } from "../models/tipoProducto";

@Injectable({
    providedIn:'root'
})

export class TipoProductoService{
    constructor(private http: HttpClient){
    }
    private baseUrl : string = "http://localhost:8080/dugas/";
    private tipoProducto : TipoProducto[] = [];

    listarTipoProducto():Observable<TipoProducto[]>{
        return this.http.get<any[]>(this.baseUrl+"listarTipoProducto").pipe(
            map(response=>{
                return response.map(tipoProductoDto=>{
                    return {
                        id:tipoProductoDto.id,
                        nombre:tipoProductoDto.nombre
                    }
                })
            })
        );

    }

    crearTipoProducto(tipoProducto:TipoProducto):Observable<string>{
        return this.http.post<string>(this.baseUrl+"crearTipoProducto",tipoProducto);
    }

    eliminarTipoProducto(id:number):Observable<string>{
        return this.http.delete<string>(this.baseUrl+"eliminarTipoProducto/"+id);
    }

}