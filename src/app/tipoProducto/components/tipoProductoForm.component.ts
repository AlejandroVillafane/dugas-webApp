import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { TipoProducto } from "../models/tipoProducto";
import { TipoProductoService } from "../services/tipoProducto.service";
import { TipoEnvase } from "../../tipoEnvases/models/tipoEnvase";
import { TipoEnvaseService } from "../../tipoEnvases/services/tipoEnvase.service";

@Component({
    templateUrl:"tipoProductoForm.component.html",
    selector:"tipoProductoForm-component",
    standalone:true,
    imports:[FormsModule]
})
export class TipoProductoForm {
    
    
    
    @Input() tipoProducto : TipoProducto = new TipoProducto();
    @Output() crearTipoProductoEvent = new EventEmitter();

    crearTipoProducto():void{
        this.crearTipoProductoEvent.emit(this.tipoProducto);
    }

    
}