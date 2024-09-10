import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AuthService } from '../auth/service/auth.service';
import { CommonModule } from '@angular/common';
import { CajasService } from '../services/cajas.service';

@Component({
  selector: 'app-cabecera',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cabecera.component.html',
  styleUrl: './cabecera.component.css',
})
export class CabeceraComponent {
  caja: any = { fecha_apertura: new Date() };
  userNameAfterLogin: string | null = null;

  showFullMenu: boolean = false;
  cajaId!: any;

  @Input() showNavbar: boolean = false;
  @Output() logOutEvent = new EventEmitter<void>();

  constructor(
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute,
    private cajaService: CajasService
  ) {}

  ngOnInit() {
    this.cajaService.currentCajaId.subscribe((id) => {
      this.cajaId = id;
      console.log('id Cabecera', this.cajaId);
      this.buscarCajaPorId()
    });

    this.showFullMenu = this.showNavbar;
    this.loadAuthenticatedUser();

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Verifica si la ruta actual es '/gestion-cajas'
        this.showFullMenu = !event.url.includes('/gestion-cajas');
      }
    });
  }
  buscarCajaPorId(){
    this.cajaService.getCajaById(this.cajaId).subscribe((caja:any) => {
      this.caja = caja;
      console.log('Caja encontrada:', this.caja);
    })
  }

  loadAuthenticatedUser(): void {
    const user = this.authService.getAuthenticatedUser();
    if (user) {
      this.userNameAfterLogin = user.userName;
      console.log('Usuario logueado:', this.userNameAfterLogin);
    }
  }
  moduloSelect(modulo: string) {
    switch (modulo) {
      case 'login':
        this.router.navigate(['login']);
        break;
      case 'abmLegajo':
        this.router.navigate(['abmLegajo']);
        break;
      case 'abmMovil':
        this.router.navigate(['abmMovil']);
        break;
      case 'abmBanco':
        this.router.navigate(['abmBanco']);
        break;
      case 'abmTarjeta':
        this.router.navigate(['abmTarjeta']);
        break;
      case 'abmProducto':
        this.router.navigate(['abmProducto']);
        break;
      case 'abmTipoEnvase':
        this.router.navigate(['abmTipoEnvase']);
        break;
      case 'abmTipoProducto':
        this.router.navigate(['abmTipoProducto']);
        break;
      case 'abmRubro':
        this.router.navigate(['abmRubro']);
        break;
      case 'abmConceptos':
        this.router.navigate(['abmConceptos']);
        break;
      case 'rendiciones':
        this.router.navigate(['rendiciones']);
        break;
      case 'rendicionForm':
        this.router.navigate(['rendicionForm']);
        break;
      case 'egresos':
        this.router.navigate(['egresos']);
        break;
      case 'egresoList':
        this.router.navigate(['egresoList']);
        break;
      case 'cobranzas':
        this.router.navigate(['cobranzas']);
        break;
      case 'cobranzaList':
        this.router.navigate(['cobranzaList']);
        break;

      case 'agregar-stock':
        this.router.navigate(['agregar-stock']);
        break;
      case 'listar-stock':
        this.router.navigate(['listar-stock']);
        break;

      case 'gestion-cajas':
        this.router.navigate(['gestion-cajas']);
        break;
    }
    this.showFullMenu = true;
  }

  cerrarSesion() {
    this.authService.logout();
    this.logOutEvent.emit();
    this.router.navigate(['login']);
  }
  cerrarCaja(): void {
    if (this.caja) {
      // Mostrar alerta de confirmación
      const confirmacion = window.confirm(
        '¿Estás seguro de que deseas cerrar todas las cajas? Esta acción es irreversible.'
      );

      if (confirmacion) {
        // Aquí llamas a tu servicio para cerrar la caja
        // this.cajasService.cerrarCaja(this.caja.id).subscribe(response => {
        console.log('Caja cerrada exitosamente');
        this.caja.fecha_cierre = new Date(); // Actualizamos el estado de la caja

        alert('La caja ha sido cerrada correctamente.');
        // });
      } else {
        console.log('Cierre de caja cancelado.');
      }
    } else {
      alert('No hay caja abierta para cerrar.');
    }
  }
  logout() {
    this.logOutEvent.emit();
  }
}
