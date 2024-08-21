import { Component, OnInit } from "@angular/core";
import { TipoEnvaseForm } from "./tipoEnvaseForm.component";
import { TipoEnvaseService } from "../services/tipoEnvase.service";
import { TipoEnvase } from "../models/tipoEnvase";
import { CommonModule } from "@angular/common";

@Component({
    selector:"tipoEnvase-component",
    templateUrl:"tipoEnvase.component.html",
    standalone:true,
    imports:[TipoEnvaseForm,CommonModule]
})

export class TipoEnvaseComponent implements OnInit{
    tipoEnvaseList:TipoEnvase []=[]
    constructor(private tipoEnvaseService:TipoEnvaseService){}
    
    ngOnInit(): void {
        this.tipoEnvaseService.listarTipoEnvase().subscribe(tipoEnvase=>this.tipoEnvaseList=tipoEnvase)
    }
    
    crearTipoEnvase(tipoEnvase:TipoEnvase){
        this.tipoEnvaseService.crearTipoEnvase(tipoEnvase).subscribe(response=>
            this.tipoEnvaseList = [... this.tipoEnvaseList,{... tipoEnvase}]
        );
        
    }

    eliminarTipoEnvase(id:number){
        this.tipoEnvaseService.eliminarTipoEnvase(id);
    }
}