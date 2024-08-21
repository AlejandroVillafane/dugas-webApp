import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { Legajo } from "../models/legajo";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn:'root'
})
export class LegajoService{

    constructor(private http:HttpClient){

    }
    private url:string = 'http://localhost:8080/dugas/listarLegajos';
    
    listarLegajos(): Observable<Legajo[]> {
        return this.http.get<any[]>(this.url).pipe(
            map(response=>{
                return response.map(legajoDTO=>{
                    return{
                        id: legajoDTO.id,
                        numeroLegajo: legajoDTO.numeroLegajo,
                        nombre: legajoDTO.nombre,
                        apellido: legajoDTO.apellido,
                        cuil: legajoDTO.cuil,
                        dni: legajoDTO.dni
                    };
                });
            })
        );
    }

    crearLegajo(legajo: Legajo): Observable<string> {
        return this.http.post<string>('http://localhost:8080/dugas/crearLegajo', legajo);
    }

    eliminarLegajo(id: number): Observable<string> {
        return this.http.delete<string>('http://localhost:8080/dugas/eliminarLegajo/'+id);
    }
}