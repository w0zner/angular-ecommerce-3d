import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-up-ecommerce',
  templateUrl: './sign-up-ecommerce.component.html',
  styleUrls: ['./sign-up-ecommerce.component.css']
})
export class SignUpEcommerceComponent {

  signUpForm: FormGroup
  showAlert: boolean = false
  errorMessage: string = ""

  constructor(private authService:AuthService, private fb: FormBuilder){
    this.signUpForm = this.fb.group({
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  registrarse() {
    this.showAlert = false
    if(this.signUpForm.valid) {
      this.authService.signUp(this.signUpForm.value.fullName, this.signUpForm.value.email, this.signUpForm.value.password).then((response) => {
        console.log(response);
      })
      .catch((error)=> {
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
