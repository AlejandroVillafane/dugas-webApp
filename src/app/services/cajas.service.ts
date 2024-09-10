import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../environment/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CajasService {

  constructor(private http :HttpClient) { }
  private cajaIdSource = new BehaviorSubject<number | null>(null); // Almacena el id de la caja
  currentCajaId = this.cajaIdSource.asObservable(); // Observa los cambios en el cajaId


  getCajasAbiertas(): Observable<any> {
    return this.http.get(environment.apiUrl + `listarCajasAbiertas`, {});
  }

  getCajaById(id: number): Observable<any> {
    return this.http.get(environment.apiUrl + `buscarCaja/${id}`, {});

  }


  createCaja(data:any): Observable<any> {
    return this.http.post(environment.apiUrl + 'aperturaCaja',data,{})
  }

  changeCajaId(cajaId: number) {
    this.cajaIdSource.next(cajaId);
  }
}

