import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import ApplicationComponent from './components/application/application';
import NavbarComponent from './components/navbar/navbar';
import FooterComponent from './components/footer/footer';
import SearchComponent from './components/search/search';
import CarouselComponent from './components/carousel/carousel';

@NgModule({
  declarations: [
    AppComponent, 
    ApplicationComponent, // ★重要，这里必须要追加，否则*ngfor等命令不可以使用
    NavbarComponent,
    FooterComponent,
    SearchComponent,
    CarouselComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [
    AppComponent, 
    ApplicationComponent, // ★重要，这里必须要追加，否则*ngfor等命令不可以使用
    NavbarComponent,
    FooterComponent,
    SearchComponent,
    CarouselComponent
  ]
})
export class AppModule { }
