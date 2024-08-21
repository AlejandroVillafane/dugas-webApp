import { Component, OnInit } from "@angular/core";
import { Movil } from "../models/movil";
import { MovilService } from "../services/movil.service";
import { MovilForm } from "./movilForm.component";

@Component({
    selector:"movil-component",
    templateUrl:"movil.component.html",
    standalone:true,
    imports:[MovilForm]
})

export class MovilComponent implements OnInit{
    moviles : Movil[] = [];
    
    constructor(private service:MovilService){}

    ngOnInit(): void {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
        this.service.listarMoviles().subscribe(moviles=>this.moviles = moviles);
    }

    onRemoveMovil(id:number):void{
        
        this.service.eliminarMovil(id).subscribe(response=>console.log(response));
        this.moviles = this.moviles.filter(movil=>{
            return movil.id != id
        });
    }

    agregarMovil(movil:Movil):void{
        this.service.crearMovil(movil).subscribe(response=>{
            this.moviles = [...this.moviles,{...movil}]
            console.log(response);
        });
    }
}