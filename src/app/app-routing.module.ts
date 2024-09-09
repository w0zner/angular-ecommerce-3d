import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MainContentComponent } from './pages/main-content/main-content.component';

const routes: Routes = [
  { path: 'ejemplos',
    loadChildren: ()=> import("./ejemplos/ejemplos.module").then(m => m.EjemplosModule)
  },
  {path: '', component: HomeComponent,
  children: [{path:'', component: MainContentComponent}]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
