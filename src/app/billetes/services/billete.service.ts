import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { Billete } from "../components/models/billete";

@Injectable({
    providedIn:'root'
})

export class BilleteService{
    constructor(private http: HttpClient){}

    listarBilletes():Observable<Billete[]>{
        return this.http.get<Billete[]>("http://localhost:8080/dugas/listarBilletes").pipe(
            map(response=>{
                return response.map(billeteDTO=>{
                    return{
                        id:billeteDTO.id,
                        order:billeteDTO.order,
                        importe:billeteDTO.importe
                    };
                });
            })
        );
    }
}