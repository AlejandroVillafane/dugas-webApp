import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { Tarjeta } from "../models/tarjeta";

@Injectable({
    providedIn:'root'
})
export class TarjetaService{
    constructor(private http:HttpClient){
    }

    private tarjetas : Tarjeta[] = []

    listarTarjetas():Observable<Tarjeta[]>{
        return this.http.get<any[]>('http://localhost:8080/dugas/listarTarjetas').pipe(
            map(response=>{
                return response.map(tarjetaDto=>{
                    return {
                        id:tarjetaDto.id,
                        nombre:tarjetaDto.nombre,
                        banco:tarjetaDto.banco,
                        tipoTarjeta:tarjetaDto.tipoTarjeta
                    };
                });
            })
        );
    }

    crearTarjeta(tarjeta: Tarjeta): Observable<string> {
        return this.http.post<string>('http://localhost:8080/dugas/crearTarjeta', tarjeta);
    }

    eliminarTarjeta(id:number):Observable<string>{
        return this.http.delete<string>('http://localhost:8080/dugas/eliminarTarjeta/'+id);
    }
}