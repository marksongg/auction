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
import StarsComponent from './components/stars/stars';
import HomeComponent from './components/home/home';
import ProductDetailComponent from './components/product-detail/product-detail';
import { ProductService } from './services/product-service';
import { FilterPipe } from './components/pipes/filter-pipe';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent, 
    ApplicationComponent, // ★重要，这里必须要追加，否则*ngfor等命令不可以使用
    NavbarComponent,
    FooterComponent,
    SearchComponent,
    CarouselComponent,
    ProductItemComponent,
    StarsComponent,
    HomeComponent,
    ProductDetailComponent,
    FilterPipe // ★重要，导入商品过滤管道Pipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // ★重要，要导入ReactiveFormsModule，不然FormContrl类不识别
    ReactiveFormsModule
  ],
  providers: [ProductService],
  bootstrap: [
    AppComponent, 
    ApplicationComponent, // ★重要，这里必须要追加，否则*ngfor等命令不可以使用
  ]
})
export class AppModule { }
