import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Tarjeta } from "../models/tarjeta";
import { Banco } from "../../bancos/models/banco";
import { BancoService } from "../../bancos/services/banco.service";

@Component({
    selector:'tarjetaForm-component',
    templateUrl:'tarjetaForm.component.html',
    standalone:true,
    imports:[FormsModule]
})



export class TarjetaForm implements OnInit{

    

    bancos : Banco[] = [];

    @Input() tarjeta : Tarjeta = new Tarjeta();

    @Output() crearTarjetaEvent = new EventEmitter();
    
    constructor(private bancoService : BancoService){}

    ngOnInit(): void {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
        this.bancoService.listarBancos().subscribe(bancos=>{
            console.log(bancos)
            this.bancos = bancos
            
        });
    }

    onSubmit():void{
        this.crearTarjetaEvent.emit(this.tarjeta);
        this.clean();
    }

    clean(){
        this.tarjeta = new Tarjeta();
    }
}