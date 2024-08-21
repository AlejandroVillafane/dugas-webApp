import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Login } from "../models/login";
import { FormsModule, NgForm } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { AuthService } from "../../auth/service/auth.service";
import { Router } from "@angular/router";

@Component({
    selector:"login-component",
    templateUrl:"login.component.html",
    standalone:true,
    imports:[FormsModule,CommonModule]

})
export class LoginComponent{
    
    constructor(private authService: AuthService, private router: Router) {}

    @Input() loginModel : Login = new Login();

    @Output() loginEvent = new EventEmitter();
/*
    login(form:NgForm):void{
       this.loginEvent.emit(this.loginModel); 
    }
*/
    username: string = '';
    password: string = '';
    login(): void {
        this.authService.login(this.username, this.password).subscribe(success => {
          if (success) {
            this.loginEvent.emit();
            this.router.navigate(['rendicionForm']);
          } else {
            alert('Login failed');
          }
        });
      }
}