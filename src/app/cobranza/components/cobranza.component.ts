import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ConductorFormComponent } from '../../rendicion/components/conductorForm.component';
import { Cobranza } from '../models/cobranza';
import { Legajo } from '../../legajos/models/legajo';
import { ModalMensajeComponent } from '../../rendicion/components/modalMensaje.component';
import { Router } from '@angular/router';
import { CobranzaService } from '../services/cobranza.service';

@Component({
  selector: 'app-cobranza',
  standalone: true,
  imports: [FormsModule,CommonModule,ConductorFormComponent,ModalMensajeComponent],
  templateUrl: './cobranza.component.html',
  styleUrl: './cobranza.component.css'
})
export class CobranzaComponent implements OnInit {
  
  constructor(private router : Router, private cobranzaService:CobranzaService){}

  

  legajoHabilitado:boolean=true
  legajoAcomHabilitado:boolean=false
  movilHabilitado:boolean=false

  popUpModalMensaje: boolean = false;
  modalMensaje:string = "";
  respuestaModalMensaje: boolean = false;

  cobranza:Cobranza = new Cobranza();
  ngOnInit(): void {
    
  }

  closeModalMensaje(value:boolean){
    if(value){
        this.popUpModalMensaje = false; // Close the modal
        this.router.navigate(['cobranzas']);
    }
}

  agregarLegajo(legajo:Legajo){
    this.cobranza.legajo = legajo;
}

guardarCobranza(form: NgForm): void {
  this.cobranzaService.guardarCobranza(this.cobranza).subscribe((response: any) => {
      this.modalMensaje = response.mensaje; // Si response es un string, lo asignas directamente
      this.popUpModalMensaje = true;
      form.reset();
  });
}
}
