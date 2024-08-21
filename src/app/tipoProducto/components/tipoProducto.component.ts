import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TipoProductoService } from "../services/tipoProducto.service";
import { TipoProducto } from "../models/tipoProducto";
import { TipoProductoForm } from "./tipoProductoForm.component";

@Component({
    selector:"tipoProducto-component",
    templateUrl:"tipoProducto.component.html",
    standalone:true,
    imports:[TipoProductoForm,CommonModule]
})

export class TipoProductoComponent implements OnInit{
    tipoProductoList:TipoProducto []=[]
    constructor(private tipoProductoService:TipoProductoService){}
    
    ngOnInit(): void {
        this.tipoProductoService.listarTipoProducto().subscribe(tipoProducto=>this.tipoProductoList=tipoProducto)
    }
    
    crearTipoProducto(tipoProducto:TipoProducto){
        this.tipoProductoService.crearTipoProducto(tipoProducto).subscribe(response=>
            this.tipoProductoList = [... this.tipoProductoList,{... tipoProducto}]
        );
        
    }

    eliminarTipoProducto(id:number){
        this.tipoProductoService.eliminarTipoProducto(id);
    }
}