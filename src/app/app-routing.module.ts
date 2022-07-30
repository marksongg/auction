import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import HomeComponent from './components/home/home';
import ProductDetailComponent from './components/product-detail/product-detail';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'products/:prodId', component: ProductDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
