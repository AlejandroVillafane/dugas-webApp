import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Producto } from '../../../productos/models/producto';
import { ProductoService } from '../../../productos/services/producto.service';
import { TipoProducto } from '../../../tipoProducto/models/tipoProducto';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-producto-form',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './producto-form.component.html',
  styleUrl: './producto-form.component.css'
})
export class ProductoFormComponent implements OnInit {

  groupedProductos: any[] = [];
  productos : Producto[] = [];
  titulo : string = "Venta de unidades Fisicas";
  @Input() totalCantidadesProducto : number = 0;
  @Input() totalKgProducto : number = 0;
  @Output() actualizarValoresProducto = new EventEmitter<any>();

  constructor(private productoService : ProductoService){}
  ngOnInit(): void {
    this.productoService.listarProductos().subscribe(productos=>{
      this.productos = productos;
      this.groupProductosByTipoProducto();
  });
  }

  actualizarValores(productoRendicion: any, groupedProductos:any):void{
    const datos = { productoRendicion, groupedProductos };
    this.actualizarValoresProducto.emit(datos);
  }

  groupProductosByTipoProducto() {
    const grouped = this.productos.reduce((acc, producto) => {
        const tipoProductoId = producto.tipoProducto.id;
        if (!acc[tipoProductoId]) {
            acc[tipoProductoId] = {
                tipoProducto: producto.tipoProducto,
                productos: [],
                cantidad:0
            };
        }
        acc[tipoProductoId].productos.push(producto);
        return acc;
    }, {} as { [key: number]: { tipoProducto: TipoProducto, productos: Producto[] , cantidad: number} });

    this.groupedProductos = Object.values(grouped);
  }
}
