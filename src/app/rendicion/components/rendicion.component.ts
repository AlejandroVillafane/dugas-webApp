import { Component, Input, OnInit } from "@angular/core";
import { ProductoService } from "../../productos/services/producto.service";
import { Producto } from "../../productos/models/producto";
import { FormsModule } from "@angular/forms";
import { Rendicion } from "../models/rendicion";
import { Banco } from "../../bancos/models/banco";
import { BancoService } from "../../bancos/services/banco.service";
import { TarjetaService } from "../../tarjetas/services/tarjeta.service";
import { Tarjeta } from "../../tarjetas/models/tarjeta";
import { RendicionConTransferencia } from "../models/rendicionConTransferencia";
import { RendicionCuentaDni } from "../models/rendicionCuentaDni";
import { RendicionMercadoPago } from "../models/rendicionMercadoPago";
import { RendicionOtros } from "../models/rendicionOtros";
import { RendicionTDTC } from "../models/rendicionTDTC";
import { RendicionCheque } from "../models/rendicionCheque";
import { Egreso } from "../models/egreso";
import { RendicionYPF } from "../models/rendicionYPF";
import { Billete } from "../../billetes/components/models/billete";
import { OtroIngreso } from "../models/otroIngreso";
import { RendicionService } from "../services/rendicion.service";
import { CurrencyFormat } from "../../util/currencyFormat";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    selector:'rendicion-component',
    standalone:true,
    templateUrl:'rendicion.component.html',
    imports:[FormsModule,CurrencyFormat]
})
export class RendicionComponent implements OnInit{
  cajaId!: number;


    constructor(private rendicionService : RendicionService, private router:Router,private route :ActivatedRoute){}
    nuevaRendicionComponent:boolean = false;
    rendiciones : Rendicion[] = [];
    ngOnInit(): void {
            this.rendicionService.listarRendiciones().subscribe(rendiciones=>{
                console.log(rendiciones)
                this.rendiciones = rendiciones;
            })
            this.route.params.subscribe(params => {
              this.cajaId = Number(params['cajaId']);
              console.log('Caja ID rendicion component:', this.cajaId);
              // Ahora puedes usar cajaId para consultar detalles de la caja o movimientos
            });

    }

    nuevaRendicion():void{
        this.nuevaRendicionComponent = true;
    }

    buscarRendicion(id:number):void{
        this.rendicionService.buscarRendicion(id).subscribe(response=>{
            console.log(response);
            this.router.navigate(['rendicion'], { state: { data: response } });
        })
    }
}
