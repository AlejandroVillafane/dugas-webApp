import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { TipoEnvase } from "../models/tipoEnvase";
import { TipoEnvaseService } from "../services/tipoEnvase.service";
import { FormsModule } from "@angular/forms";

@Component({
    templateUrl:"tipoEnvaseForm.component.html",
    selector:"tipoEnvaseForm-component",
    standalone:true,
    imports:[FormsModule]
})
export class TipoEnvaseForm {
    
    
    
    @Input() tipoEnvase : TipoEnvase = new TipoEnvase();
    @Output() crearTipoEnvaseEvent = new EventEmitter();
    
    crearTipoEnvase():void{
        this.crearTipoEnvaseEvent.emit(this.tipoEnvase);
    }

    
}