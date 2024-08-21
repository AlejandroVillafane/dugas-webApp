import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { Usuario } from '../../usuarios/models/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLoggedIn = false;
  usuario:Usuario = new Usuario();
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<boolean> {
    this.usuario.userName = username;
    this.usuario.password = password;
    return this.http.post<{ token: string }>('http://localhost:8080/dugas/users/login',this.usuario).pipe(
      map(response => {
        localStorage.setItem('authToken', response.token);
        this.isLoggedIn = true;
        return true;
      }),
      catchError(error => {
        console.error('Login error', error);
        return of(false);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.isLoggedIn = false;
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn || !!localStorage.getItem('authToken');
  }
}
