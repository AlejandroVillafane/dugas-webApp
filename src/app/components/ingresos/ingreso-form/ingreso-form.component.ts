import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OtroIngreso } from '../../../rendicion/models/otroIngreso';
import { Concepto } from '../../../conceptos/models/concepto';
import { CurrencyFormat } from '../../../util/currencyFormat';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ingreso-form',
  standalone: true,
  imports: [FormsModule,CurrencyFormat, CommonModule],
  templateUrl: './ingreso-form.component.html',
  styleUrl: './ingreso-form.component.css'
})
export class IngresoFormComponent {

  titulo : string = "Ingresos";
  @Input() totalIngreso : number = 0;
  otroIngreso : OtroIngreso = new OtroIngreso();
  @Input() otroIngresoList : OtroIngreso[] = [];
  
  @Input() conceptoList : Concepto[] = []
  @Output() enviarIngresoActualizado = new EventEmitter<OtroIngreso[]>();
  //@Output() ingresoEliminado = new EventEmitter<OtroIngreso[]>();
  @ViewChild('otrosIngresosInput') otrosIngresosInput!: ElementRef; 
  
  agregarOtroIngreso() : void {
    this.otroIngresoList = [
        ... this.otroIngresoList,
        {... this.otroIngreso}
    ]
    this.otroIngreso = new OtroIngreso();
    //this.calcularTotalOperacion("otroIngreso")
    //this.actualizarTotalEfectivo();
    this.otrosIngresosInput.nativeElement.focus();
    this.calcularTotalIngreso();

    this.enviarIngresoActualizado.emit(this.otroIngresoList)
  }

  eliminarOtroIngreso(index:number):void{
    this.otroIngresoList = this.otroIngresoList.filter(
        (rendicion,i)=>{
            return i!=index
        }
    )
    this.calcularTotalIngreso();
    this.enviarIngresoActualizado.emit(this.otroIngresoList)

    //this.calcularTotalOperacion("otroIngreso");
    //this.actualizarTotalEfectivo();
  }

  focusInput(value:string): void {
    console.log(value)
    if(value == "otrosIngresosInput"){
        console.log(1)

        this.otrosIngresosInput.nativeElement.focus();  // Método para hacer foco en el input
    }
  }

  calcularTotalIngreso():void{
    this.totalIngreso = 0;
    this.otroIngresoList.forEach(ingreso=>{
      this.totalIngreso += ingreso.importe
    })
  }
}
