import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Producto } from "../models/producto";
import { TipoProducto } from "../../tipoProducto/models/tipoProducto";
import { TipoEnvase } from "../../tipoEnvases/models/tipoEnvase";
import { TipoProductoService } from "../../tipoProducto/services/tipoProducto.service";
import { TipoEnvaseService } from "../../tipoEnvases/services/tipoEnvase.service";

@Component({
    selector:'productoForm-component',
    templateUrl:'productoForm.component.html',
    standalone:true,
    imports:[FormsModule]
})

export class ProductoForm implements OnInit{

    tipoProductoList : TipoProducto[] = []
    tipoEnvaseList : TipoEnvase[]=[];
    
    constructor(private tipoProductoService:TipoProductoService, private tipoEnvaseService:TipoEnvaseService){}
    
    ngOnInit(): void {
        this.tipoProductoService.listarTipoProducto().subscribe(response=>
            {
                this.tipoProductoList = response
                console.log(this.tipoProductoList);
            }
            
        )
        this.tipoEnvaseService.listarTipoEnvase().subscribe(response=>this.tipoEnvaseList = response)
       
        console.log(this.tipoEnvaseList);

    }

    @Input() producto : Producto = new Producto();

    @Output() crearProductoEvent = new EventEmitter();
    
    onSubmit():void{
        this.crearProductoEvent.emit(this.producto);
        this.clean();
    }

    clean(){
        this.producto = new Producto();
    }
}