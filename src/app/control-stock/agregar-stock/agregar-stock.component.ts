import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ControlStockService } from '../../services/control-stock.service';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { SnackBarService } from '../../services/snack-bar.service';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarAction, MatSnackBarActions, MatSnackBarLabel } from '@angular/material/snack-bar';


interface Stock {
  proveedorId?:any;
  proveedor: any;
  fechaFactura: Date;
  numFactura: string;
  productos: any[];
}

@Component({
  selector: 'app-agregar-stock',
  standalone: true,
  imports: [FormsModule, CommonModule,NgbAlertModule,MatButtonModule, MatSnackBarLabel, MatSnackBarActions, MatSnackBarAction],
  templateUrl: './agregar-stock.component.html',
  styleUrls: ['./agregar-stock.component.css']
})
export class AgregarStockComponent {
  alerts: { type: string, message: string }[] = [];
  private _snackBar = inject(MatSnackBar);



  nuevoProducto: any = {
    codigo: '',
    cantidad: 0,
    descripcion: '',
    producto: '',
    precioUnitario: 0,
  };
  nuevoStock: Stock = {
    proveedorId: '',
    proveedor: '',
    numFactura: '',
    fechaFactura: new Date(),
    productos: []
  };

  stocks: Stock[] = [];
  productos: any[] = [];
  proveedores: any[] = [];
  productosList: any[] = [];  // Lista de productos para el select
  durationInSeconds = 5;



  constructor(private controlStockService: ControlStockService,private snackBarService:SnackBarService
  ) {}
  openSnackBar() {
    this._snackBar.open('Stock cargado exitosamente');
}

  ngOnInit() {
    this.controlStockService.getProveedores().subscribe(data => {
     console.log(data);
     this.proveedores = data;

    }

    )
    this.controlStockService.getProductos().subscribe(data => {
      console.log(data);
      this.productosList = data; // Guardamos la lista de productos obtenida del servicio

    })
  }
  agregarProducto() {
    const productoAgregado = { ...this.nuevoProducto };
    productoAgregado.importeTotal = productoAgregado.cantidad * productoAgregado.precioUnitario;

    // Agregar el producto con importeTotal calculado
    this.productos.push(productoAgregado);

    // Reiniciar nuevoProducto sin afectar el objeto ya agregado
    this.nuevoProducto = { codigo: '', cantidad: 0, descripcion: '', producto: '', precioUnitario: 0 };

    this.limpiarCamposProducto(); // Limpia los campos del producto después de agregar
  }


  limpiarCamposProducto() {
    this.nuevoProducto = {
      codigo: '',
      cantidad: 0,
      descripcion: '',
      producto: '',
      precioUnitario: 0,
    };
  }

  limpiarCamposStock() {
    this.nuevoStock = {
      proveedor: '',
      numFactura: '',
      fechaFactura: new Date(),
      productos: []
    };
    this.productos = [];
  }
  agregarStock(stockForm: NgForm) {

    const nuevoStock = {
      fecha: this.nuevoStock.fechaFactura,
      numeroFactura: this.nuevoStock.numFactura,
      proveedor: {
        id: this.nuevoStock.proveedor.id,
        cuit: this.nuevoStock.proveedor.cuit,
        razonSocial: this.nuevoStock.proveedor.razonSocial
      },
      detalleFactura: this.productos.map(prod => ({
        codigo: prod.codigo,
        cantidad: prod.cantidad,
        descripcion: prod.descripcion,
        precioUnitario: prod.precioUnitario,
        importeTotal: prod.cantidad * prod.precioUnitario,
        producto: {
          id: prod.producto.id,
          tipoEnvase: {
            id: prod.producto.tipoEnvase.id,
            nombre: prod.producto.tipoEnvase.nombre,
            capacidad: prod.producto.tipoEnvase.capacidad
          },
          tipoProducto: {
            id: prod.producto.tipoProducto.id,
            nombre: prod.producto.tipoProducto.nombre
          }
        }
      }))
    };

    // Aquí llamamos al servicio para enviar el objeto con los datos del stock
    this.controlStockService.postNuevoStock(nuevoStock).subscribe(
      response => {
        this.snackBarService.showsSnackBar('Stock cargado éxitosamente')


        this.limpiarCamposStock();
      },
      error => {
        console.error('Error al agregar el stock', error);
      }
    );
  }

  showAlert(type: string, message: string) {
    this.alerts.push({ type, message });
  }

  trackAlert(index: number, alert: any) {
    return index;
  }
  showSuccessAlert() {
    alert('Stock cargado exitosamente.');
  }
  close(alert:any) {
    this.alerts = this.alerts.filter(a => a !== alert);
  }

  calcularTotalGeneral() {
    return this.productos.reduce((total, producto) => total + producto.importeTotal, 0);
  }


}
