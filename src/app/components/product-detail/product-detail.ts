import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: '',
    styleUrls: ['./product-detail.css'],
    template: `
      <div class="box">
          <div class="card mb-3" style="max-width: 540px;">
              <img [src]="img" class="card-img-top" alt="">
              <div class="card-body">
                <h1 class="card-title">{{productTitle}}</h1>
                <p class="card-text">{{description}}</p>
                <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small><a href="" class="btn btn-primary">戻る</a></p>
              </div>
          </div>
          
      </div>
    `
})
export default class ProductDetailComponent{
    productTitle: string;
    img: string;
    description: string;
    constructor(route: ActivatedRoute){
        this.productTitle = route.snapshot.params['prodTitle'];
        this.img = route.snapshot.params['img'];
        this.description = route.snapshot.params['description'];
    }
}