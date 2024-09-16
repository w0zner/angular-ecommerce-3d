import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthExampleService } from 'src/app/services/authExampleservice';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {

  signInForm: FormGroup
  showAlert: boolean = false
  errorMessage: string = ""

  constructor(private authService: AuthExampleService, private fb: FormBuilder) {
    this.signInForm = fb.group({
      email: [''],
      password: ['']
    })
  }

  iniciarSesion() {
    console.log(this.signInForm.value)
    if(this.signInForm.valid){
      this.authService.signIn(this.signInForm.value.email, this.signInForm.value.password).then((response) => {
        this.showAlert = false
        console.log(response)
      })
      .catch((error) => {
        this.showAlert = true
        this.errorMessage = error
      })
    }
  }

}
