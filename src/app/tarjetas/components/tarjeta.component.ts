import { Component, OnInit } from "@angular/core";
import { Tarjeta } from "../models/tarjeta";
import { TarjetaService } from "../services/tarjeta.service";
import { TarjetaForm } from "./tarjetaForm.component";
import { Banco } from "../../bancos/models/banco";

@Component({
    selector:"tarjeta-component",
    templateUrl:"tarjeta.component.html",
    standalone:true,
    imports:[TarjetaForm]
})

export class TarjetaComponent implements OnInit{
    
    tarjetas : Tarjeta[] = [];
    
    constructor(private service:TarjetaService){}
    
    ngOnInit(): void {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
        this.service.listarTarjetas().subscribe(tarjetas=>this.tarjetas = tarjetas);
    }

    eliminarTarjeta(id:number):void{
        this.service.eliminarTarjeta(id).subscribe(response=>{
           this.tarjetas = this.tarjetas.filter(tarjeta=>tarjeta.id !=id)
        });
    }

    crearTarjeta(tarjeta:Tarjeta) : void {
        this.service.crearTarjeta(tarjeta).subscribe(response=>{
            this.tarjetas = [... this.tarjetas,{... tarjeta}]
        });
    }
}