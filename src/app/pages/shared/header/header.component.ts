import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import {CATEGORIES} from '../../../constants/constants'


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  fullName: string = ""
  isLogged: Boolean = false
  categories = CATEGORIES

  constructor(private authService: AuthService) {

    /* this.authService.fullName$.subscribe({
     next: (name) => {
       console.log('value ',name);
       this.fullName = name ? name : '';
     }
   }) */
  }

  ngOnInit(): void {
    this.isLogged = this.authService.checkUserSession()
    this.authService.fullName$.subscribe({
      next: (name) => {
        console.log('value ',name);
        this.fullName = name ? name : '';
      }
    })
    //this.fullName = this.authService.name
  }

  cerrarSesion() {
    this.authService.signOut().then((response)=>{
      this.fullName = ""
    })
  }

}
