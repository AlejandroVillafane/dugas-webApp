import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Rubro } from "../models/rubro";

@Component({
    templateUrl:"rubroForm.component.html",
    selector:"rubroForm-component",
    standalone:true,
    imports:[FormsModule]
})
export class RubroForm {
    
    
    
    @Input() rubro : Rubro = new Rubro();
    @Output() crearRubroEvent = new EventEmitter();
    
    crearRubro():void{
        this.crearRubroEvent.emit(this.rubro);
        this.rubro = new Rubro();
    }

    limpiar(){
        this.rubro = new Rubro();
    }

    
}