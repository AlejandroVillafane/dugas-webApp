import { Component, OnInit } from "@angular/core";
import { Banco } from "../models/banco";
import { BancoService } from "../services/banco.service";
import { BancoForm } from "./bancoForm.component";

@Component({
    selector:"banco-component",
    templateUrl:"banco.component.html",
    standalone:true,
    imports:[BancoForm]
})

export class BancoComponent implements OnInit{
    
    bancos : Banco[] = [];
    
    constructor(private service:BancoService){}
    
    ngOnInit(): void {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
        this.service.listarBancos().subscribe(bancos=>this.bancos = bancos);
    }

    eliminarBanco(id:number):void{
        this.service.eliminarBanco(id).subscribe(response=>{
            console.log(response)
            this.bancos = this.bancos.filter(banco=>banco.id !=id)
        });
    }

    crearBanco(banco:Banco) : void {
        this.service.crearBanco(banco).subscribe(response=>{
            this.bancos = [... this.bancos,{... banco}]
        });
    }
}