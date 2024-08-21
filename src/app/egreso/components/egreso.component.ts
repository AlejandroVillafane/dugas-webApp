import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { MedioDePagoService } from '../../medioDePago/services/medioDePago.service';
import { MedioDePago } from '../../medioDePago/models/medioDePago';
import { Egreso } from '../models/egreso';
import { EgresoService } from '../services/egreso.service';

@Component({
  selector: 'app-egreso',
  standalone: true,
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './egreso.component.html',
  styleUrl: './egreso.component.css'
})
export class EgresoComponent implements OnInit{

  constructor(private mediosDePagoService : MedioDePagoService,private egresoService : EgresoService){}

  mediosDepagoList:MedioDePago[] = [];
  medioDePago:MedioDePago = new MedioDePago();
  
  importeMedioPago = 0;
  diferencias = 0;
  egreso:Egreso = new Egreso();
  

  ngOnInit(): void {
   this.mediosDePagoService.listarMediosDePago().subscribe(response=>{
      this.mediosDepagoList = response;
   });
  }

  agregarDetalle():void{
    this.egreso.detalleEgreso.push({
      medioDePago:this.medioDePago,
      importe:this.importeMedioPago
    })
    this.importeMedioPago = 0;
    this.calcularDiferencias();
  }

  eliminarDetalle(index:number):void{
    this.egreso.detalleEgreso = this.egreso.detalleEgreso.filter((detalle,i)=>i!=index)
    this.calcularDiferencias();

  }

  calcularDiferencias():void{
    let totalDetalle = 0;
    this.egreso.detalleEgreso.forEach(detalle=>{
      totalDetalle+=detalle.importe
    })
    this.diferencias = this.egreso.importe - totalDetalle;
  }

  guardarEgreso(form : NgForm):void{
    this.egresoService.guardarEgreso(this.egreso).subscribe(response=>{
      console.log(response)
    });
  }
}