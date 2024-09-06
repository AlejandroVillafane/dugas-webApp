import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MockDataService {
  private mockDataUrl = 'assets/mock-data.json';  // Ruta al archivo JSON con datos simulados

  constructor(private http: HttpClient) { }

  obtenerFactura(): Observable<any> {
    // Retorna el archivo JSON simulado
    return this.http.get<any>(this.mockDataUrl);
  }
}
