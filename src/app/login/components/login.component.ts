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
    imports:[FormsModule,CommonModule],
    styleUrls: ['./login.component.css']


})
export class LoginComponent{

    constructor(private authService: AuthService, private router: Router) {}

    @Input() loginModel : Login = new Login();

    @Output() loginEvent = new EventEmitter();
/*
    login(form:NgForm):void{
       this.loginEvent.emit(this.loginModel);
    }
*/  userNameAfterLogin: string | null = null;

    username: string = '';
    password: string = '';
    login(): void {
      this.authService.login(this.username, this.password).subscribe(response => {
        if (response && response.authenticatedUser) {
          // Captura el nombre de usuario desde la respuesta
          this.userNameAfterLogin = response.authenticatedUser.userName;
          console.log('Nombre de usuario:', this.userNameAfterLogin);

          // Emitir el evento de login para otros componentes si es necesario
          this.loginEvent.emit();

          // Redirigir al usuario a otra página
          this.router.navigate(['gestion-cajas']);
        } else {
          alert('Login failed');
        }
      }, error => {
        console.error('Error en el login:', error);
        alert('Login failed');
      });
    }
}
