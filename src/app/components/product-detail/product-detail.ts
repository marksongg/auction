import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Product, Review, ProductService } from "src/app/services/product-service";

@Component({
    selector: '',
    styleUrls: ['./product-detail.css'],
    templateUrl: './product-detail.html'
})
export default class ProductDetailComponent{
    product: Product | undefined;
    productId: number;
    reviews: Review[];

    // 这里使用DI依赖注入ProductService
    // 需要在ngModule处，使用providers，将ProductService加载进来
    constructor(route: ActivatedRoute, productService: ProductService){
        this.productId = route.snapshot.params['prodId'];
        this.product = productService.getProductById(this.productId);
        this.reviews = productService.getReviewsForProduct(this.productId);
        console.log(this.reviews);
    }
}