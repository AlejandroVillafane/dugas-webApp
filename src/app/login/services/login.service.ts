import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { Login } from "../models/login";
import { Usuario } from "../../usuarios/models/usuario";

@Injectable({
    providedIn:'root'
})
export class LoginService{

    constructor(private http:HttpClient){

    }

    login(login:Login):Observable<Usuario>{

        const params = new HttpParams()
        .set('userName', login.userName)
        .set('password', login.password);
        
      
        return this.http.get<Usuario>("http://localhost:8080/dugas/users/login", { params });
    }
}