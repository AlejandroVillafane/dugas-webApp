import { Injectable } from "@angular/core";
import { Observable, map, of } from "rxjs";
import { Producto } from "../models/producto";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn:'root'
})
export class ProductoService{
    constructor(private http: HttpClient){
        
    }
    
    private productos : Producto[] = []
    
    crearProducto(producto:Producto):Observable<string>{
        console.log(producto)
        return this.http.post<string>('http://localhost:8080/dugas/crearProducto',producto);
    }

    listarProductos():Observable<Producto[]>{
        return this.http.get<any[]>('http://localhost:8080/dugas/listarProductos').pipe(
            map(response=>{
                return response.map(productoDto=>{
                    return  {
                        id:productoDto.id,
                        tipoProducto:productoDto.tipoProducto,
                        tipoEnvase:productoDto.tipoEnvase,
                        
                    }
                })
            })
        );
    }

    eliminarProducto(id:number):Observable<string>{
        console.log(id);
        return this.http.delete<string>('http://localhost:8080/dugas/eliminarProducto/'+id);
    }
}