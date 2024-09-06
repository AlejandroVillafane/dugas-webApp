import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/service/auth.service';

@Component({
  selector: 'app-cabecera',
  standalone: true,
  imports: [],
  templateUrl: './cabecera.component.html',
  styleUrl: './cabecera.component.css'
})
export class CabeceraComponent {

  constructor(
    private router:Router, private authService:AuthService
  ){}

  @Output() logOutEvent = new EventEmitter();

  moduloSelect(modulo:string){
    switch(modulo){
    case "login":
      this.router.navigate(["login"])
      break;
    case "abmLegajo":
        this.router.navigate(["abmLegajo"])
        break;
    case "abmMovil":
      this.router.navigate(["abmMovil"])
      break;
      case "abmBanco":
        this.router.navigate(["abmBanco"])
        break;
    case "abmTarjeta":
      this.router.navigate(["abmTarjeta"])
      break;
      case "abmProducto":
        this.router.navigate(["abmProducto"])
        break;
    case "abmTipoEnvase":
      this.router.navigate(["abmTipoEnvase"])
      break;
      case "abmTipoProducto":
        this.router.navigate(["abmTipoProducto"])
        break;
    case "abmRubro":
      this.router.navigate(["abmRubro"])
      break;
    case "abmConceptos":
      this.router.navigate(["abmConceptos"])
      break;
    case "rendiciones":
      this.router.navigate(["rendiciones"])
      break;
    case "rendicionForm":
      this.router.navigate(["rendicionForm"])
      break;
    case "egresos":
      this.router.navigate(["egresos"])
      break;
    case "egresoList":
      this.router.navigate(["egresoList"])
      break;
    case "cobranzas":
      this.router.navigate(["cobranzas"])
      break;
    case "cobranzaList":
      this.router.navigate(["cobranzaList"])
      break;

      case "agregar-stock":
        this.router.navigate(["agregar-stock"])
        break;
        case "listar-stock":
          this.router.navigate(["listar-stock"])
          break;


    }

  }

  cerrarSesion(){
    this.authService.logout();
    this.logOutEvent.emit();
    this.router.navigate(["login"])
  }
}
