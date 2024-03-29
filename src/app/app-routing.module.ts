import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { ProductsComponent } from './Products/products/products.component';
import { SingleProductComponent } from './Products/single-product/single-product.component';

import { LocationsComponent } from './Locations/locations/locations.component';
import { SingleLocationComponent } from './Locations/single-location/single-location.component';


import { RegisterComponent } from './Account/register/register.component';

import { LoginComponent } from './Account/login/login.component';

const routes: Routes = [
  {
    path: '',
    component:ProductsComponent
  },
  {
    path:'products',
    component:ProductsComponent
  },

  {
    path:'products/:id',
    component:SingleProductComponent

  },
  {
    path:'locations',
    component:LocationsComponent
  },

  {
    path:'locations/:id',
    component:SingleLocationComponent

  },

  {
    path:'register',
    component:RegisterComponent

  },

  {
    path:'login',
    component:LoginComponent

  }


];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
