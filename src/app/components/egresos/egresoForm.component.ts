import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Egreso } from '../../rendicion/models/egreso';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Concepto } from '../../conceptos/models/concepto';
import { CurrencyFormat } from '../../util/currencyFormat';
import { MedioDePago } from '../../medioDePago/models/medioDePago';

@Component({
  selector: 'app-egresoForm',
  standalone: true,
  imports: [CommonModule, FormsModule,CurrencyFormat],
  templateUrl: './egresos.component.html',
  styleUrl: './egresos.component.css'
})


export class EgresoFormComponent {

  egreso:Egreso = new Egreso();
  @Input() totalEgresos : number = 0;

  @Input() conceptoList : Concepto[] = []
  @Input() egresoList : Egreso[] = []
  @Input() mediosDepagoList:MedioDePago[] = [];
  @Output() egresoAgregado = new EventEmitter<Egreso[]>();
  @Output() egresoEliminado = new EventEmitter<Egreso[]>();
  
  
  
  agregarEgreso() : void {
      console.log(this.egreso)
      this.egresoList = [
          ... this.egresoList,
          {... this.egreso}
      ]
      this.egreso = new Egreso();
      this.calcularTotalEgreso();
      this.egresoAgregado.emit(this.egresoList)
      
      
  }

  eliminarEgreso(index:number):void{
      this.egresoList = this.egresoList.filter(
          (rendicion,i)=>{
              return i!=index
          }
      )
      this.calcularTotalEgreso();
      this.egresoEliminado.emit(this.egresoList)
  }

  calcularTotalEgreso(){
    this.totalEgresos  = 0;
    this.egresoList.forEach(egreso=>{
        this.totalEgresos += egreso.importe
    })
    console.log(this.totalEgresos)
  }
}
