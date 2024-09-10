import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth/service/auth.service';
import { AuthCommunicationService } from '../services/auth-communication.service';
import { CajasService } from '../services/cajas.service';

export interface Caja {
  id: number;
  usuario_id: number;
  fechaApertura: Date | null;
  fecha_cierre: Date | null;
}

@Component({
  selector: 'app-cajas',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule],
  templateUrl: './cajas.component.html',
  styleUrl: './cajas.component.css',
})
export class CajasComponent {
  @Output() logOutEvent = new EventEmitter<void>();

  userNameAfterLogin: string | null = null;

  cajas: Caja[] = [];
  showOpenCajaButton = false; // Boolean to control button visibility


  constructor(
    private cajasServices: CajasService,
    private router: Router,
    private authService: AuthService,
    private authCommunicationService: AuthCommunicationService
  ) {
    this.loadAuthenticatedUser();
  }

  ngOnInit() {
    this.getCajas()
  }

  getCajas(){
    this.cajasServices.getCajasAbiertas().subscribe((data) => {
      // Transform the data to match the Caja interface
      this.cajas = data.map((caja: Caja) => ({
        id: caja.id,
        usuario_id: caja.usuario_id, // Assuming dni corresponds to usuario_id
        fechaApertura: caja.fechaApertura,
        fecha_cierre: caja.fecha_cierre ? new Date() : null,
      }));
      console.log(this.cajas);
      this.checkAndOpenCaja();

    });

  }


  loadAuthenticatedUser(): void {
    const user = this.authService.getAuthenticatedUser();
    if (user) {
      this.userNameAfterLogin = user.userName;
      console.log('Usuario logueado:', this.userNameAfterLogin);
    }
  }

  hayCajaHoy(): boolean {
    const hoy = new Date().toISOString().split('T')[0];
    console.log('Fecha hoy:', hoy);
    console.log('Cajas:', this.cajas);
    const result = this.cajas.some(
      caja => caja.fechaApertura && new Date(caja.fechaApertura).toISOString().split('T')[0] === hoy
    );
    console.log('Hay caja hoy:', result);
    return result;
  }

  checkAndOpenCaja() {
    // Show the button if there are no cajas or no caja is open today
    if (this.cajas.length === 0 || !this.hayCajaHoy()) {
      this.showOpenCajaButton = true;
    } else {
      this.showOpenCajaButton = false;
    }
  }


  abrirCaja(): void {
    const nuevaCaja = {
      id: this.cajas.length + 1, // Or use another method to generate unique ids
      fechaApertura: new Date().toISOString().split('T')[0], // Format date as YYYY-MM-DD
      fechaCierre: null,
      usuario: {
        userName: "admin",
        password: "admin",
        cuil: 1234,
        dni: 1234,
        admin: false,
        roles: [
          { id: 1, role: "ROLE_ADMIN" },
          { id: 2, role: "ROLE_USER" }
        ]
      }
    };

    this.cajasServices.createCaja(nuevaCaja).subscribe(
      (cajaCreada) => {
        this.cajas.push(cajaCreada);
        console.log('Caja creada y añadida a la lista:', cajaCreada);
        this.getCajas()
      },
      (error) => {
        console.error('Error al crear la caja:', error);
      }
    );
  }


  verMovimientos(cajaId: number): void {
    this.cajasServices.changeCajaId(cajaId); // Actualizar el cajaId en el servicio

    // Aquí puedes redirigir a una página de detalles
    this.router.navigate(['/rendicionForm', cajaId]);

    // O puedes abrir un modal con los movimientos de la caja si prefieres eso
    // Ejemplo: abrir un modal (si tienes implementado)
    // this.modalService.openMovimientosModal(cajaId);
  }

  logout() {
    this.authCommunicationService.emitLogout();
    console.log('logout cjas component');
  }
}
