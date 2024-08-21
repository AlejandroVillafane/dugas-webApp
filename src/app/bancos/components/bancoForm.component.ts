import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Banco } from "../models/banco";

@Component({
    selector:'bancoForm-component',
    templateUrl:'bancoForm.component.html',
    standalone:true,
    imports:[FormsModule]
})

export class BancoForm{

    @Input() banco : Banco = new Banco();

    @Output() crearBancoEvent = new EventEmitter();
    
    onSubmit():void{
        console.log(this.banco)
        this.crearBancoEvent.emit(this.banco);
        this.clean();
    }

    clean(){
        this.banco = new Banco();
    }
}