import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { MedioDePagoService } from '../../medioDePago/services/medioDePago.service';
import { MedioDePago } from '../../medioDePago/models/medioDePago';
import { EgresoModel } from '../models/egreso';

import { EgresoService } from '../services/egreso.service';
import { EgresoFormComponent } from '../../components/egresos/egresoForm.component';
import { ConceptoService } from '../../conceptos/services/concepto.service';
import { Concepto } from '../../conceptos/models/concepto';
import { Egreso } from '../../rendicion/models/egreso';
import { Router } from '@angular/router';
import { ModalMensajeComponent } from '../../rendicion/components/modalMensaje.component';

@Component({
  selector: 'app-egreso',
  standalone: true,
  imports: [FormsModule,CommonModule,ReactiveFormsModule,EgresoFormComponent,ModalMensajeComponent],
  templateUrl: './egreso.component.html',
  styleUrl: './egreso.component.css'
})
export class EgresoComponent implements OnInit{

  constructor(
    private mediosDePagoService : MedioDePagoService,
    private egresoService : EgresoService,
    private conceptoService : ConceptoService,
    private router : Router
  ){}
  spinnerLoading : boolean = false
  mediosDepagoList:MedioDePago[] = [];
  medioDePago:MedioDePago = new MedioDePago();
  conceptoList : Concepto[] = []
  importeMedioPago = 0;
  diferencias = 0;
  egreso:EgresoModel = new EgresoModel();
  egresoList : EgresoModel[] = []

  popUpModalMensaje: boolean = false;
  modalMensaje:string = "Mensaje por defecto";
  respuestaModalMensaje: boolean = false;

  ngOnInit(): void {
   this.mediosDePagoService.listarMediosDePago().subscribe(response=>{
      this.mediosDepagoList = response;
   });

   this.conceptoService.listarConceptos().subscribe(response=>{
    console.log(response)
    this.conceptoList = response
   })
  }

  closeModalMensaje(value:boolean){
    if(value){
        this.popUpModalMensaje = false; // Close the modal
        this.router.navigate(['egresoForm']);
    }
  }
/*
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
*/
agregarEgreso(egresoList:Egreso[]):void{
  this.egreso.detalleEgreso = egresoList;
  //this.importeMedioPago = 0;
  this.calcularDiferencias();
}

eliminarEgreso(egresoList:Egreso[]):void{
  this.egreso.detalleEgreso = egresoList;
  /*this.calcularTotalOperacion("egresos");
  this.actualizarTotalEfectivo();*/
  this.calcularDiferencias();
}

  calcularDiferencias():void{
    let totalDetalle = 0;
    this.egreso.detalleEgreso.forEach(detalle=>{
      totalDetalle+=detalle.importe
    })
    this.diferencias = this.egreso.importe - totalDetalle;
    console.log(this.diferencias)
  }

  guardarEgreso(form : NgForm):void{
    this.spinnerLoading = true
   
    this.egresoService.guardarEgreso(this.egreso).subscribe(response=>{
      console.log(response)
      this.spinnerLoading = false
      this.popUpModalMensaje = true
      this.modalMensaje = "El egreso de guardo con exito!"
    });
  }
}