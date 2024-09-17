import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  fullName: string = ""

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.fullName$.subscribe({
      next: (name) => {
        this.fullName = name
      }
    })
  }

  cerrarSesion() {
    this.authService.signOut().then((response)=>{
      this.fullName = ""
    })
  }

}
