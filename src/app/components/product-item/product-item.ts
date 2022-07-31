import { Component, Input } from "@angular/core";
import { Product, ProductService } from "../../services/product-service";

@Component({
    selector: 'auction-product-item',
    templateUrl: './product-item.html'
})
export default class ProductItemComponent {
    @Input() product: Product | undefined;
    @Input() img: string | undefined;
    @Input() rating: number = 0;

    constructor(productService: ProductService){
        // 可能不是最好的办法
        let products = productService.getProducts();
        if(products){
            this.product = products[0];
            this.img = products[0].img;
            this.rating = products[0].rating;
        }
    }
  }