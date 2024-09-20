import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MainContentComponent } from './pages/main-content/main-content.component';
import { ProductListComponent } from './pages/products/product-list/product-list.component';
import { ProductDetailComponent } from './pages/products/product-detail/product-detail.component';
import { SignInEcommerceComponent } from './pages/auth/sign-in-ecommerce/sign-in-ecommerce.component';
import { SignUpEcommerceComponent } from './pages/auth/sign-up-ecommerce/sign-up-ecommerce.component';
import { ProductUploadComponent } from './pages/products/product-upload/product-upload.component';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'ejemplos',
    loadChildren: ()=> import("./ejemplos/ejemplos.module").then(m => m.EjemplosModule)
  },
  {path: '', component: HomeComponent,
  children: [
      {path:'', component: MainContentComponent},
      {path:'products/:categoryid', component: ProductListComponent},
      {path: 'product/:id', component: ProductDetailComponent},
      {path: 'signin', component: SignInEcommerceComponent},
      {path: 'signup', component: SignUpEcommerceComponent}
    ]
  },
  {path: 'upload', component: ProductUploadComponent, canActivate: [authGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
