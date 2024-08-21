import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: 'modal-mensaje',  // Este es el selector que usamos en app.component.html
    templateUrl: 'modalMensaje.component.html',
    styleUrls: ['modalMensaje.component.css'],
    standalone : true,
    imports : [CommonModule]
  })
  export class ModalMensajeComponent {
    @Input() popUpModalMensaje: boolean = false;
    @Output() response = new EventEmitter<boolean>();
  
    @Input() modalMensaje:string = "mensaje"
    
    closeModalMensaje(value: boolean) {
      this.response.emit(value);
      this.popUpModalMensaje = false;  // Cierra el modal
    }
  }