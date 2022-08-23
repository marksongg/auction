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
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { WebSocketService } from './services/websocket-service';
import ReferenceComponent from './components/reference/reference';


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
    ReferenceComponent, //備考コンポーネント
    FilterPipe // ★重要，导入商品过滤管道Pipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // ★重要，一定要引入FormModule，不然[(ngModel)]属性不识别
    FormsModule,
    // ★重要，引入HtppClient相关的类
    HttpClientModule,
    // ★重要，要导入ReactiveFormsModule，不然FormContrl类不识别
    ReactiveFormsModule
  ],
  providers: [ProductService, WebSocketService],
  bootstrap: [
    AppComponent, 
    ApplicationComponent, // ★重要，这里必须要追加，否则*ngfor等命令不可以使用
  ]
})
export class AppModule { }
