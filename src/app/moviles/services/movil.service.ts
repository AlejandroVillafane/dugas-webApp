import { Injectable } from "@angular/core";
import { Observable, map, of } from "rxjs";
import { Movil } from "../models/movil";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn:'root'
})
export class MovilService{
    constructor(private http:HttpClient){
    }

    private url : string = 'http://localhost:8080/dugas/listarMoviles';
    //private url : string = 'http://localhost:8080/dugas/listarMoviles';
    
    private moviles : Movil[] = [
        {
            id:1,
            modelo:'modelo1',
            dominio:'aaa111',
            numeroInterno:1
        },
        {
            id:2,
            modelo:'modelo2',
            dominio:'bbb222',
            numeroInterno:2
        }
    ]

    listarMoviles():Observable<Movil[]>{
        return this.http.get<any[]>(this.url).pipe(
            map(response=>{
                return response.map(movilDto=>{
                    return {
                        id:movilDto.id,
                        modelo:movilDto.modelo,
                        dominio:movilDto.dominio,
                        numeroInterno:movilDto.numeroInterno
                    };
                });
            })
        );
    }

    crearMovil(movil: Movil): Observable<string> {
        console.log(movil)
        return this.http.post<string>('http://localhost:8080/dugas/crearMovil', movil);
    }

    eliminarMovil(id:number):Observable<string>{
        return this.http.delete<string>('http://localhost:8080/dugas/eliminarMovil/'+id);
    }
}