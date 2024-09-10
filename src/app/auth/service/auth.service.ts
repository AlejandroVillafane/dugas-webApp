import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { Usuario } from '../../usuarios/models/usuario';
import { environment } from '../../environment/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private isLoggedIn = false;
  usuario: Usuario = new Usuario();
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    this.usuario.userName = username;
    this.usuario.password = password;

    return this.http
      .post<any>(environment.apiUrl + `users/login`, this.usuario)
      .pipe(
        map((response) => {
          // Guardar el token en localStorage
          localStorage.setItem('authToken', response.token);
          // Guardar los datos del usuario en localStorage
          localStorage.setItem(
            'authenticatedUser',
            JSON.stringify(response.authenticatedUser)
          );

          this.isLoggedIn = true;
          return response;
        }),
        catchError((error) => {
          console.error('Login error', error);
          return of(false);
        })
      );
  }

  getAuthenticatedUser(): any {
    const user = localStorage.getItem('authenticatedUser');
    return user ? JSON.parse(user) : null;
  }

  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('authenticatedUser');
    this.isLoggedIn = false;
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn || !!localStorage.getItem('authToken');
  }
}
