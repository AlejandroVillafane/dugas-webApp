import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { Rubro } from "../models/rubro";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn:'root'
})

export class RubroService{

    constructor(private http : HttpClient){}
    private baseUrl : string = "http://localhost:8080/dugas/";

    listarRubros():Observable<Rubro[]>{
        return this.http.get<any[]>(this.baseUrl+"listarRubro").pipe(
            map(response=>{
                return response.map(rubroDto=>{
                    return {
                        id:rubroDto.id,
                        nombre:rubroDto.nombre
                    }
                })
            })
        );

    }

    crearRubro(rubro:Rubro):Observable<string>{
        return this.http.post<string>(this.baseUrl+"crearRubro",rubro);
    }

    eliminarRubro(id:number):Observable<string>{
        console.log(id)
        return this.http.delete<string>(this.baseUrl+"eliminarRubro/"+id);
    }
}