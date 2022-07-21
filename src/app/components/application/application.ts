import { Component, ViewEncapsulation } from "@angular/core";

@Component({
    selector: 'auction-application',
    templateUrl: './application.html',
    styleUrls: ['./application.css'],
    encapsulation: ViewEncapsulation.None
})
export default class ApplicationComponent {
    products: Array<string> = [];

    constructor(){
        this.products = ['Mark', 'Perter', 'Jessica' , 'Liu'];
    }
}