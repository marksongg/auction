import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import ApplicationComponent from './components/application/application';
import NavbarComponent from './components/navbar/navbar';
import FooterComponent from './components/footer/footer';
import SearchComponent from './components/search/search';
import CarouselComponent from './components/carousel/carousel';
import ProductItemComponent from './components/product-item/product-item';
import { ProductService } from './services/product-service';

@NgModule({
  declarations: [
    AppComponent, 
    ApplicationComponent, // ★重要，这里必须要追加，否则*ngfor等命令不可以使用
    NavbarComponent,
    FooterComponent,
    SearchComponent,
    CarouselComponent,
    ProductItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [ProductService],
  bootstrap: [
    AppComponent, 
    ApplicationComponent, // ★重要，这里必须要追加，否则*ngfor等命令不可以使用
    NavbarComponent,
    FooterComponent,
    SearchComponent,
    CarouselComponent,
    ProductItemComponent
  ]
})
export class AppModule { }
