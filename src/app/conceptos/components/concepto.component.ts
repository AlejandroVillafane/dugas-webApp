import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ConceptoService } from "../services/concepto.service";
import { Concepto } from "../models/concepto";
import { ConceptoFormComponent } from "./conceptoForm.component";
import { Rubro } from "../../rubros/models/rubro";
import { RubroService } from "../../rubros/services/rubro.service";

@Component({
    selector:"concepto-component",
    templateUrl:"concepto.component.html",
    standalone:true,
    imports:[ConceptoFormComponent,CommonModule]
})

export class ConceptoComponent implements OnInit{
    conceptoList:Concepto []=[]
    rubroList : Rubro[]=[]
    constructor(private conceptoService:ConceptoService,private rubroService:RubroService){}
    
    ngOnInit(): void {
        this.conceptoService.listarConceptos().subscribe(concepto=>this.conceptoList=concepto)
        this.rubroService.listarRubros().subscribe(rubros=>{
            console.log(rubros)
            this.rubroList = rubros;
        });
    }
    
    crearConcepto(concepto:Concepto){
        console.log(concepto)
        this.conceptoService.crearConcepto(concepto).subscribe(response=>
            this.conceptoList = [... this.conceptoList,{... concepto}]
        );
        
    }

    eliminarConcepto(id:number){
        console.log(id)
        this.conceptoService.eliminarConcepto(id).subscribe(response=>{
            this.conceptoList = this.conceptoList.filter(concepto=>concepto.id !=id)
        }
        );
    }
}