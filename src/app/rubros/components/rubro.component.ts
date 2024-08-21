import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RubroForm } from "./rubroForm.component";
import { Rubro } from "../models/rubro";
import { RubroService } from "../services/rubro.service";

@Component({
    selector:"rubro-component",
    templateUrl:"rubro.component.html",
    standalone:true,
    imports:[RubroForm,CommonModule]
})

export class RubroComponent implements OnInit{
    rubroList:Rubro []=[]
    constructor(private rubroService:RubroService){}
    
    ngOnInit(): void {
        this.rubroService.listarRubros().subscribe(rubros=>this.rubroList=rubros)
    }
    
    crearRubro(rubro:Rubro){
        this.rubroService.crearRubro(rubro).subscribe(response=>
            this.rubroList = [... this.rubroList,{... rubro}]
        );
        
    }

    eliminarRubro(id:number){
        console.log(id)
        this.rubroService.eliminarRubro(id).subscribe(response=>{
            this.rubroList = this.rubroList.filter(rubro=>rubro.id !=id)
        }
        );
    }
}