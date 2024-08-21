import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Observable, map, startWith } from "rxjs";
import { Legajo } from "../../legajos/models/legajo";
import { FormControl, FormsModule } from "@angular/forms";
import { LegajoService } from "../../legajos/services/legajo.service";
import { CommonModule } from "@angular/common";
import { MovilService } from "../../moviles/services/movil.service";
import { Movil } from "../../moviles/models/movil";
import { ModalComponent } from "./modal.component";
import { ModalMensajeComponent } from "./modalMensaje.component";

@Component({
    templateUrl:"conductorForm.component.html",
    selector:"conductorForm-component",
    standalone : true,
    imports : [FormsModule,CommonModule, ModalMensajeComponent],
    styleUrl: "conductorForm.component.css"
})

export class ConductorFormComponent implements OnInit{
    
    popUpModalMensaje: boolean = false;
    modalMensaje:string = "";
    respuestaModalMensaje: boolean = false;
  
    @Output() legajo = new EventEmitter<Legajo>();
    @Output() legajoAcom = new EventEmitter<Legajo>();
    @Output() movil = new EventEmitter<Movil>();

    @Input() legajoHabilitado: boolean = false;
    @Input() legajoAcomHabilitado: boolean = false;
    @Input() movilHabilitado: boolean = false;

    legajoList: Legajo[] = [];
    filteredLegajoList: Legajo[] = [];
    searchTerm: string = '';
    selectedLegajo: Legajo | null = null;
    isInputFocused: boolean = false;

    legajoAcompananteList: Legajo[] = [];
    filteredLegajoAcompananteList: Legajo[] = [];
    searchTermAcompanante: string = '';
    selectedLegajoAcompanante: Legajo | null = null;
    isInputFocusedAcompanante: boolean = false;

    movilList: Movil[] = [];
    filteredMovilList: Movil[] = [];
    searchTermMovil: string = '';
    selectedMovil: Movil | null = null;
    isInputFocusedMovil: boolean = false;

    constructor(
        private legajoService : LegajoService, 
        private movilService : MovilService
    ){}

    ngOnInit(): void {
        this.legajoService.listarLegajos().subscribe(legajos => {
          this.legajoList = legajos;
          this.filteredLegajoList = legajos;
          this.legajoAcompananteList = legajos;
          this.filteredLegajoAcompananteList = legajos;
        });
        this.movilService.listarMoviles().subscribe(moviles => {
          this.movilList = moviles;
          this.filteredMovilList = moviles;
        });
      }

      filterLegajos(): void {
          this.filteredLegajoList = this.legajoList.filter(legajo =>
            legajo.nombre.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
            legajo.apellido.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
            legajo.numeroLegajo.toString().includes(this.searchTerm)
          );
      }

      selectLegajo(legajo: Legajo): void {
        if(legajo.cuil == this.selectedLegajoAcompanante?.cuil){
          this.popUpModalMensaje = true;
          this.modalMensaje = "El legajo de conductor y acompañante no pueden ser iguales";
        }else{
          this.selectedLegajo = legajo;
          this.searchTerm = `${legajo.nombre} ${legajo.apellido} - ${legajo.numeroLegajo}`;
          this.isInputFocused = false;  // Ocultar la lista cuando se selecciona un legajo
          this.legajo.emit(legajo);
        }
      }

      onFocus(): void {
        this.isInputFocused = true;
      }
    
      onBlur(): void {
        setTimeout(() => {
          this.isInputFocused = false;
        }, 200);  // Agregar un pequeño retraso para permitir la selección del elemento
      }

      filterLegajosAcompanante(): void {
          this.filteredLegajoAcompananteList = this.legajoAcompananteList.filter(legajo =>
            legajo.nombre.toLowerCase().includes(this.searchTermAcompanante.toLowerCase()) ||
            legajo.apellido.toLowerCase().includes(this.searchTermAcompanante.toLowerCase()) ||
            legajo.numeroLegajo.toString().includes(this.searchTermAcompanante)
          );
      }

      selectLegajoAcompanante(legajo: Legajo): void {
        if(legajo.cuil == this.selectedLegajo?.cuil){
          this.popUpModalMensaje = true;
          this.modalMensaje = "El legajo de conductor y acompañante no pueden ser iguales";
        }else{
          this.selectedLegajoAcompanante = legajo;
          this.searchTermAcompanante = `${legajo.nombre} ${legajo.apellido} - ${legajo.numeroLegajo}`;
          this.isInputFocusedAcompanante = false;  // Ocultar la lista cuando se selecciona un legajo
          this.legajoAcom.emit(legajo);
        }
      }

      onFocusAcompanante(): void {
        this.isInputFocusedAcompanante = true;
      }
    
      onBlurAcompanante(): void {
        setTimeout(() => {
          this.isInputFocusedAcompanante = false;
        }, 200);  // Agregar un pequeño retraso para permitir la selección del elemento
      }

      filterMoviles(): void {
        this.filteredMovilList = this.movilList.filter(movil =>
          movil.dominio.toLowerCase().includes(this.searchTermMovil.toLowerCase()) ||
          String(movil.numeroInterno).toLowerCase().includes(this.searchTermMovil.toLowerCase()) 
        );
      }

      selectMovil(movil: Movil): void {
        this.selectedMovil = movil;
        this.searchTermMovil = `${movil.dominio} - ${movil.numeroInterno}`;
        this.isInputFocusedMovil = false;  // Ocultar la lista cuando se selecciona un legajo
        this.movil.emit(movil);
      }
    
      onFocusMovil(): void {
        this.isInputFocusedMovil = true;
      }
    
      onBlurMovil(): void {
        setTimeout(() => {
          this.isInputFocusedMovil = false;
        }, 200);  // Agregar un pequeño retraso para permitir la selección del elemento
      }

      closeModalMensaje(value:boolean){
        if(value){
            this.popUpModalMensaje = false; // Close the modal
            //this.router.navigate(['rendicionForm']);
        }
    }

      resetVariables() {
        
        this.filteredLegajoList = [];
        this.searchTerm = '';
        this.selectedLegajo = null;
        this.filteredLegajoAcompananteList = [];
        this.searchTermAcompanante = '';
        this.selectedLegajoAcompanante = null;
        this.filteredMovilList = [];
        this.searchTermMovil = '';
        this.selectedMovil = null;
    
      }
}