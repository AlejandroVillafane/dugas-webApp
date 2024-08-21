import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Banco } from "../models/banco";
import { Observable, map } from "rxjs";

@Injectable({
    providedIn:'root'
})
export class BancoService{
    constructor(private http:HttpClient){
    }

    private bancos : Banco[] = []

    listarBancos():Observable<Banco[]>{
        return this.http.get<any[]>('http://localhost:8080/dugas/listarBancos').pipe(
            map(response=>{
                return response.map(bancoDto=>{
                    return {
                        id:bancoDto.id,
                        nombre:bancoDto.nombre
                    };
                });
            })
        );
    }

    crearBanco(banco: Banco): Observable<string> {
        return this.http.post<string>('http://localhost:8080/dugas/crearBanco', banco);
    }

    eliminarBanco(id:number):Observable<string>{
        return this.http.delete<string>('http://localhost:8080/dugas/eliminarBanco/'+id);
    }
    buscarBanco(id:number):Observable<Banco>{
        return this.http.get<any>('http://localhost:8080/dugas/buscarBanco/'+id).pipe(
           map(response=>response)
        );
    }

}