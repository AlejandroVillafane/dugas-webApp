import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment.prod';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ControlStockService {
  constructor(private http: HttpClient) {}

  //TRAE TODOS LOS PROVEEDORES
  getProveedores(): Observable<any> {
    return this.http.get(environment.apiUrl + `listarProveedores`, {});
  }
  //TRAE TODOS LOS PRODUCTOS

  getProductos(): Observable<any> {
    return this.http.get(environment.apiUrl + `listarProductos`, {});
  }

  //POST PARA AGREGAR TABLE
  postNuevoStock(nuevoStock:any): Observable<any> {
    return this.http.post(environment.apiUrl + 'guardarStock',nuevoStock,{})
  }
}
