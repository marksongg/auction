import { Component } from "@angular/core";
import {Product, ProductService} from '../../services/product-service'

@Component({
    selector: 'auction-home-page',
    styleUrls: ['./home.css'],
    template: `
        <div class="row carousel-holder">
            <div class="col-md-12">
                <auction-carousel></auction-carousel>
            </div>
        </div>
        <div class="row">
            <div *ngFor = "let prod of products" class="col-sm-4 col-lg-4 col-md-4">
                <div class="auction-product-item">
                    <auction-product-item [product]="prod" [img]="prod.img" [rating]="prod.rating"></auction-product-item>
                </div>
            </div>
        </div>
    `
})
export default class HomeComponent {
    products: Array<Product> = [];

    constructor(private productService: ProductService){
        // 商品サービスをコールする
        this.products = this.productService.getProducts();
    }
}
