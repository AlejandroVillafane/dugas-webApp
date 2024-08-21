import { Component, OnInit } from "@angular/core";
import { ProductoService } from "../services/producto.service";
import { Producto } from "../models/producto";
import { ProductoForm } from "./productoForm.component";

@Component({
    selector:"producto-component",
    templateUrl:"producto.component.html",
    standalone:true,
    imports:[ProductoForm]
})

export class ProductoComponent implements OnInit{
    
    productos : Producto[] = [];
    
    constructor(private service:ProductoService){}
    
    ngOnInit(): void {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
        this.service.listarProductos().subscribe(productos=>this.productos = productos);
    }

    onRemoveProducto(id:number):void{
        this.service.eliminarProducto(id).subscribe(response=>{
            console.log(response)
            this.productos = this.productos.filter(producto=>producto.id !=id)
        });
    }

    crearProducto(producto:Producto) : void {
        console.log(producto)
        this.service.crearProducto(producto).subscribe(response=>{
            console.log(response)
            this.productos = [... this.productos,{... producto}]
        });
    }
}