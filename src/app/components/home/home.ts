import { Component } from "@angular/core";
import {Product, ProductService} from '../../services/product-service'
import { FormControl } from "@angular/forms";
import { debounceTime } from "rxjs/operators";
import * as $ from "jquery";

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

        <!-- 模态框 -->
        <div class="modal" id="myModal">
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
         
              <!-- 模态框头部 -->
              <div class="modal-header">
                <h4 class="modal-title">提示信息</h4>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
              </div>
         
              <!-- 模态框内容 -->
              <div class="modal-body">
                没有查询到数据，请重新查询!
              </div>
         
              <!-- 模态框底部 -->
              <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-bs-dismiss="modal" (click)="closeModal()" >关闭</button>
              </div>
         
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

        // 增加一个订阅
        this.productService.searchEvent.subscribe(params => {
          // 根据HttpClient查询后端note服务器的所有商品数据
          this.productService.searchProducts(params).subscribe(data => {
            if(data){
              this.products = data;

              if(this.products.length === 0){
                // 模态画面的右上角的×,不表示
                $(".btn-close").hide();
                // 模态画面表示
                $("#myModal").show();
              }
            } 
          });
        });
    }

    // 关闭模态画面
    closeModal(){
      // 模态画面隐藏起来
      $("#myModal").hide();
    }
}
