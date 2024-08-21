import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Legajo } from '../models/legajo';

@Component({
  selector: 'legajoForm-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './legajoForm.component.html'
})
export class LegajoForm {

  @Input() legajo: Legajo = {
    id: 0,
    numeroLegajo:0,
    nombre:'',
    apellido:'',
    cuil:0,
    dni:0
    
  };

  @Output() nuevoLegajoEvent = new EventEmitter();

  onSubmit(): void {
    this.nuevoLegajoEvent.emit(this.legajo);
    this.clean();
  }

  clean(): void{
    this.legajo = new Legajo();
  }
}