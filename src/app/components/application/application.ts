import { Component, ViewEncapsulation } from "@angular/core";

@Component({
    selector: 'auction-application',
    templateUrl: './application.html',
    styleUrls: ['./application.css'],
    encapsulation: ViewEncapsulation.None
})
export default class ApplicationComponent {
    // TODO
    products: Array<string> = [];

    constructor(){
        // TODO サービスをコールする
        this.products = ['Mark', 'Perter', 'Jessica' , 'Liu'];
    }
}