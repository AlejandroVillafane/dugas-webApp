import { Component } from "@angular/core";
import { LegajoComponent } from "../../legajos/components/legajo.component";
import { MovilComponent } from "../../moviles/components/movil.component";
import { ProductoComponent } from "../../productos/components/producto.component";
import { BancoComponent } from "../../bancos/components/banco.component";
import { TarjetaComponent } from "../../tarjetas/components/tarjeta.component";
import { RubroComponent } from "../../rubros/components/rubro.component";

@Component({
    selector:'abm-component',
    templateUrl:'abm.component.html',
    standalone:true,
    imports:[LegajoComponent,MovilComponent,ProductoComponent,BancoComponent,TarjetaComponent,RubroComponent] 
})
export class AbmComponent{
    abmLegajo : boolean = false;
    abmMovil : boolean = false;
    abmProducto : boolean = false;
    abmBanco : boolean = false;
    abmTarjeta : boolean = false;
    abmRubro : boolean = false;

    showAbm(botonValue : string):void{
        switch(botonValue){
            case 'abmLegajo':
                this.abmLegajo = true;
                this.abmMovil = false;
                this.abmProducto = false;
                this.abmBanco = false;
                this.abmTarjeta = false;
                this.abmRubro = false;
                break;
            case 'movil':
                this.abmLegajo = false;
                this.abmMovil = true;
                this.abmProducto = false;
                this.abmBanco = false;
                this.abmTarjeta = false;
                this.abmRubro = false;
                break;
            case 'producto':
                this.abmLegajo = false;
                this.abmMovil = false;
                this.abmProducto = true;
                this.abmBanco = false;
                this.abmTarjeta = false;
                this.abmRubro = false;
                break;
            case 'banco':
                this.abmLegajo = false;
                this.abmMovil = false;
                this.abmProducto = false;
                this.abmBanco = true;
                this.abmTarjeta = false;
                this.abmRubro = false;
                break;
            case 'tarjeta':
                this.abmLegajo = false;
                this.abmMovil = false;
                this.abmProducto = false;
                this.abmBanco = false;
                this.abmTarjeta = true;
                this.abmRubro = false;
                break;
            case 'rubro':
                this.abmLegajo = false;
                this.abmMovil = false;
                this.abmProducto = false;
                this.abmBanco = false;
                this.abmTarjeta = false;
                this.abmRubro = true;
                break;
        }
    }
}