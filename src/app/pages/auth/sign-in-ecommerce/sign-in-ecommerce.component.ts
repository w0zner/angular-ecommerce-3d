import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-in-ecommerce',
  templateUrl: './sign-in-ecommerce.component.html',
  styleUrls: ['./sign-in-ecommerce.component.css']
})
export class SignInEcommerceComponent {

  signInForm: FormGroup
  showAlert: boolean = false
  errorMessage: string = ""

  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router) {
    this.signInForm = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  iniciarSesion(){
    this.showAlert = false
    if(this.signInForm.valid){
      this.authService.signIn(this.signInForm.value.email, this.signInForm.value.password).then((response) => {
        console.log(response)
        this.router.navigateByUrl("/")
        console.log("ESTADO: ",this.authService.getStoredUser());

      })
      .catch((error) => {
        this.showAlert = true
        console.log(error);
        this.errorMessage = error
      })
    } else {
      this.showAlert = true
      console.log("Hay campos invalidos");
      this.errorMessage = "Hay campos invalidos"
    }
  }

}
