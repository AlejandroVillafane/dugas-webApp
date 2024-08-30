import { Component, OnInit } from '@angular/core';
import { EgresoService } from '../../services/egreso.service';
import { EgresoModel } from '../../models/egreso';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-egreso-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './egreso-list.component.html',
  styleUrl: './egreso-list.component.css'
})
export class EgresoListComponent implements OnInit {

  constructor(private egresoService:EgresoService){}

  egresos : EgresoModel[] = [];
  detalle : any;
  ngOnInit(): void {
    this.egresoService.listarEgresos().subscribe(response=>{
      console.log(response)
      this.egresos = response;
    })
  }

  mostrarDetalle(detalle:any):void{
    this.detalle = detalle;
    console.log(detalle)
  }
}
