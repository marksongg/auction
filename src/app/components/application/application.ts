import { Component, ViewEncapsulation } from "@angular/core";
import {Product, ProductService} from '../../services/product-service'

@Component({
    selector: 'auction-application',
    templateUrl: './application.html',
    styleUrls: ['./application.css'],
    encapsulation: ViewEncapsulation.None
})
export default class ApplicationComponent {
    products: Array<Product> = [];

    constructor(private productService: ProductService){
        // 商品サービスをコールする
        this.products = this.productService.getProducts();
    }
}