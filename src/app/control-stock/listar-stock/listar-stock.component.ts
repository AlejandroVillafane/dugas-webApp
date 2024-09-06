import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { MockDataService } from '../../services/mock-data-service.service';

// models.ts

// Interface para el proveedor
export interface Proveedor {
  cuit: number;
  RazonSocial: string;
}

// Interface para el tipo de producto
export interface TipoProducto {
  id: number;
  nombre: string;
}

// Interface para el tipo de envase
export interface TipoEnvase {
  id: number;
  nombre: string;
  capacidad: number;
}

// Interface para el producto
export interface Producto {
  tipoProducto: TipoProducto;
  tipoEnvase: TipoEnvase;
}

// Interface para el detalle de factura
export interface DetalleFactura {
  codigo: number;
  producto: Producto;
  descripcion: string;
  precioUnitario: number;
  cantidad: number;
  importeTotal: number;
}

// Interface para la factura
export interface Factura {
  fecha: string;
  proveedor: Proveedor;
  detalleFactura: DetalleFactura[];
}

@Component({
  selector: 'app-listar-stock',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listar-stock.component.html',
  styleUrl: './listar-stock.component.css',
})
export class ListarStockComponent {
  factura: Factura | null = null;
  private mockDataUrl = 'assets/mock-data.json';


  ngOnInit(): void {
    this.obtenerFactura();
  }
  constructor(private http: HttpClient,private mockDataService :MockDataService) {}

  // obtenerFactura(): void {
  //   this.http.get<Factura>('url-del-backend').subscribe((data) => {
  //     this.factura = data;
  //   });
  // }
  obtenerFactura(): void {
    this.mockDataService.obtenerFactura().subscribe(data => {
      this.factura = data;
    });
  }
}
