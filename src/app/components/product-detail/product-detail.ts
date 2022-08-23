import { Component, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Product, Review, ProductService } from "src/app/services/product-service";

@Component({
    selector: '',
    styleUrls: ['./product-detail.css'],
    templateUrl: './product-detail.html'
})
export default class ProductDetailComponent implements OnDestroy{
    product: Product | undefined;
    productId: number;
    reviews: Review[];

    isReviewHidden: boolean = true;
    newRating:number = 0;
    newComment:string = "";

    isWatching: boolean= false;

    // 这里使用DI依赖注入ProductService
    // 需要在ngModule处，使用providers，将ProductService加载进来
    constructor(route: ActivatedRoute, productService: ProductService){
        this.productId = route.snapshot.params['prodId'];
        this.product = productService.getProductById(this.productId);
        this.reviews = productService.getReviewsForProduct(this.productId);
        console.log(this.reviews);
    }

    toggletWatchProduct(){
        if(this.isWatching){
            this.isWatching = false;
        } else {
            this.isWatching = true;
        }
    }

    // 需要实现implements OnDestroy，当画面关闭时，关闭订阅
    ngOnDestroy(): void {
        // TODO
    }


    addReview(){
        // 最新的评价对象新规作成
        // 现实业务中，最新的评价需要登录到DB中
        let tempComment: string = this.newComment? this.newComment: "未评论！";
        let review = new Review(0, this.productId, new Date(), 'Anonymous', this.newRating, tempComment);

        // 在原有的数组最末端，加入这条消息
        this.reviews = [...this.reviews, review];

        // 重新评份
        if(this.product){
            this.product.rating = this.averageRating(this.reviews);
        }

        // reset重置评价
        this.restForm();
    }

    // 根据最新的评论条数，更新评价分值几星
    averageRating(reviews: Review[]): number {
        let sum = this.reviews.reduce((average, review) => average + review.rating, 0);

        return sum / this.reviews.length;
    }

    restForm(){
        this.newComment = "";
        this.newRating = 0;
        this.isReviewHidden = true;
    }
}