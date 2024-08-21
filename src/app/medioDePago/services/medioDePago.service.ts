import { map, Observable } from "rxjs";
import { MedioDePago } from "../models/medioDePago";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
@Injectable({
    providedIn:'root'
})
export class MedioDePagoService{

    constructor(private http: HttpClient){}

    //mediosDePago : string[] = ["Tarjeta","Cuenta DNI","Efectivo"]
    mediosDePagoList:MedioDePago[] = [];

    listarMediosDePago():Observable<MedioDePago[]>{
        return this.http.get<any[]>("http://localhost:8080/dugas/listarMediosDePago").pipe(
            map(response=>{
                return response.map(medioDePago=>{
                    return  {
                        nombre:medioDePago.nombre,
                        id:medioDePago.id
                    }
                })
            })
        )
    }
}