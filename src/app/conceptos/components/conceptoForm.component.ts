import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Concepto } from "../models/concepto";
import { CommonModule } from "@angular/common";
import { Rubro } from "../../rubros/models/rubro";

@Component({
    templateUrl:"conceptoForm.component.html",
    selector:"conceptoForm-component",
    standalone:true,
    imports:[FormsModule,CommonModule]
})
export class ConceptoFormComponent implements OnInit{
    
    
    @Input() rubroList : Rubro[] = [];
    @Input() concepto : Concepto = new Concepto();
    @Output() crearConceptoEvent = new EventEmitter();
    
    ngOnInit(): void {
        console.log(this.rubroList)
    }

    crearConcepto():void{
        this.crearConceptoEvent.emit(this.concepto);
        this.limpiar();
    }

    limpiar(){
        this.concepto = new Concepto();
    }

    
}