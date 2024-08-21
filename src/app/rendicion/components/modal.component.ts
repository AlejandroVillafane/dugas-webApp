import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: 'app-modal',  // Este es el selector que usamos en app.component.html
    templateUrl: 'modal.component.html',
    styleUrls: ['modal.component.css'],
    standalone : true,
    imports : [CommonModule]
  })
  export class ModalComponent {
    @Input() popUp: boolean = false;
    @Output() response = new EventEmitter<boolean>();
  
    @Input() mensaje:string = "mensaje"
    
    handleResponse(value: boolean) {
      this.response.emit(value);
      this.popUp = false;  // Cierra el modal
    }
  }