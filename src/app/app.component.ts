import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AbmComponent } from './abm/components/abm.component';
import { RendicionComponent } from './rendicion/components/rendicion.component';
import { RendicionFormComponent } from './rendicion/components/rendicionForm.component';
import { Login } from './login/models/login';
import { LoginService } from './login/services/login.service';
import { LoginComponent } from './login/components/login.component';
import { TarjetaComponent } from './tarjetas/components/tarjeta.component';
import { BancoComponent } from './bancos/components/banco.component';
import { ProductoComponent } from './productos/components/producto.component';
import { MovilComponent } from './moviles/components/movil.component';
import { LegajoComponent } from './legajos/components/legajo.component';
import { TipoEnvase } from './tipoEnvases/models/tipoEnvase';
import { TipoEnvaseComponent } from './tipoEnvases/components/tipoEnvase.component';
import { TipoProducto } from './tipoProducto/models/tipoProducto';
import { TipoProductoComponent } from './tipoProducto/components/tipoProducto.component';
import { RubroComponent } from './rubros/components/rubro.component';
import { ConceptoComponent } from './conceptos/components/concepto.component';

import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { CabeceraComponent } from './cabecera/cabecera.component';
import { AuthService } from './auth/service/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    LoginComponent,
    CabeceraComponent,
    CommonModule
  ],
  templateUrl: 'app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  
  constructor(private loginService:LoginService, private authService : AuthService){}
  
  

  title = 'Dugas';
  isAuth:boolean = false;
  ngOnInit(){
    this.isAuth = this.authService.isAuthenticated();
    console.log(this.isAuth)
  }

  login(success:boolean){
    this.isAuth = success;
  }
}
