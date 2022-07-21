import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  // template:`<h1>Hello Angular 2</h1>`
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'auction';

  names = ['1','2','3'];
}
