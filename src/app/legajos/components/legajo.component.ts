import { Component, OnInit } from "@angular/core";
import { LegajoService } from "../services/legajo.service";
import { Legajo } from "../models/legajo";
import { LegajoForm } from "./legajoForm.component";

@Component({
    selector:"legajo-component",
    templateUrl:"legajo.component.html",
    standalone:true,
    imports:[LegajoForm]
})

export class LegajoComponent implements OnInit{
    legajos : Legajo[] = [];
    
    constructor(private service:LegajoService){}

    legajoSelected: Legajo = new Legajo();
    
    agregarLegajo(legajo: Legajo): void {
      this.service.crearLegajo(legajo).subscribe(response=>{
        this.legajos = [... this.legajos, { ...legajo }];
      });
    }
    
    ngOnInit(): void {
      //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
      //Add 'implements OnInit' to the class.
      this.service.listarLegajos().subscribe(legajos=>this.legajos = legajos);
      console.log("legajoComponent")
    }

    onRemoveLegajo(id: number): void {
      this.legajos = this.legajos.filter(product => product.id != id);
      this.service.eliminarLegajo(id).subscribe(response=>console.log(response));
    }
    
    onUpdateLegajo(legajoRow: Legajo): void {
      this.legajoSelected = {... legajoRow};
    }
}