import { Component } from "@angular/core";
import {Product, ProductService} from '../../services/product-service'
import { FormControl } from "@angular/forms";
import { debounceTime } from "rxjs/operators";

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
          <div class="col-md-12">
            <div class="form-group">
              <input placeholder="Filter products by title" class="form-control" type="text" [formControl]="titleFilter">
            </div>
          </div>
        </div>
        <br/>
        <div class="row">
            <div *ngFor = "let prod of products | filter:'title':filterCriteria" class="col-sm-4 col-lg-4 col-md-4">
                <div class="auction-product-item">
                    <auction-product-item [product]="prod" [img]="prod.img" [rating]="prod.rating"></auction-product-item>
                </div>
            </div>
        </div>
    `
})
export default class HomeComponent {
    products: Array<Product> = [];
    titleFilter: FormControl = new FormControl();
    filterCriteria: string = "";

    constructor(private productService: ProductService){
        // 商品サービスをコールする
        this.products = this.productService.getProducts();
        this.titleFilter.valueChanges
          .pipe(debounceTime(200))
          .subscribe({
            next: (v) => this.filterCriteria = v,
            error: (e)=> console.error(e),
            // complete: () => console.info('complete')
          }
        );
    }
}
