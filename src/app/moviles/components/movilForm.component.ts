import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Movil } from "../models/movil";

@Component({
    selector:'movil-form',
    templateUrl:'movilForm.component.html',
    standalone:true,
    imports:[FormsModule]
})

export class MovilForm{

    @Input() movil : Movil = new Movil();

    @Output() crearMovilEvent = new EventEmitter();

    onSubmit():void{
        this.crearMovilEvent.emit(this.movil);
        this.clean();
    }

    clean(){
        this.movil = new Movil();
    }
}