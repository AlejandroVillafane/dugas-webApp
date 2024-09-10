import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
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
import { CajasComponent } from './cajas/cajas.component';
import { AuthCommunicationService } from './services/auth-communication.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    LoginComponent,
    CabeceraComponent,
    CommonModule,
    CajasComponent
  ],
  templateUrl: 'app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Dugas';
  isAuth: boolean = false;
  showNavbar: boolean = true;
  isCajaScreen: boolean = false;
  cajaId: number | null = null;
  constructor(private authService: AuthService, private router: Router,private authCommunicationService : AuthCommunicationService) { }

  ngOnInit() {
    this.isAuth = this.authService.isAuthenticated();

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showNavbar = !event.url.includes('/gestion-cajas');
        this.isCajaScreen = event.url.includes('/gestion-cajas');
      }
    });

    if (this.isAuth) {
      this.router.navigate(['/gestion-cajas']);
    }
    this.authCommunicationService.logOutEvent.subscribe(() => {
      this.onLogout();
    });
  }

  onLogin() {
    this.isAuth = true;
    this.router.navigate(['/gestion-cajas']);
  }

  onLogout() {
    this.authService.logout();
    this.isAuth = false;
    this.showNavbar = true;
    this.router.navigate(['/login']);
  }
}
