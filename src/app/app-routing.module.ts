import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  //{path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '', component: HomeComponent},
  { path: 'ejemplos',
  loadChildren: ()=> import("./ejemplos/ejemplos.module").then(m => m.EjemplosModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
