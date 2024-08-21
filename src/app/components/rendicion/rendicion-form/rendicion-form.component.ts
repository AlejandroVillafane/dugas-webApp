import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Rendicion } from '../../../rendicion/models/rendicion';

@Component({
  selector: 'app-rendicion-form',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './rendicion-form.component.html',
  styleUrl: './rendicion-form.component.css'
})
export class RendicionFormComponent {

  titulo:string = "Planilla de rendicion"
  isEdicion : boolean = true

  rendicion : Rendicion = new Rendicion();
}
