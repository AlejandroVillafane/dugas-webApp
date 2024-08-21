import { Component, OnInit } from '@angular/core';
import { CobranzaService } from '../../services/cobranza.service';
import { Cobranza } from '../../models/cobranza';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cobranza-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cobranza-list.component.html',
  styleUrl: './cobranza-list.component.css'
})
export class CobranzaListComponent implements OnInit {
  constructor(private cobranzaService:CobranzaService){}

  cobranzas : Cobranza[] = [];
  
  ngOnInit(): void {
    this.cobranzaService.listarCobranzas().subscribe(response=>{
      console.log(response)
      this.cobranzas = response;
    })
  }

  mostrarDetalle(detalle:any):void{
    
    console.log(detalle)
  }
}
