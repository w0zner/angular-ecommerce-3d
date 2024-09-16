import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthExampleService } from 'src/app/services/authExampleservice';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  signUpForm: FormGroup
  showAlert: boolean = false
  errorMessage: string = ""

  constructor(private authService: AuthExampleService, private fb: FormBuilder) {
    this.signUpForm = fb.group({
      nombre: [''],
      email: [''],
      password: [''],
      confirmPassword: ['']
    })
  }

  registro() {
    console.log(this.signUpForm.value);
    this.authService.signUp(this.signUpForm.value.email, this.signUpForm.value.password).then((userCredential) => {
      console.log(userCredential);
      this.showAlert = false
    })
    .catch((error) => {
      this.showAlert = true
      this.errorMessage = error
    })
  }



}
