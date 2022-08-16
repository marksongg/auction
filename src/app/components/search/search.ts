import { Component } from "@angular/core";
import { ProductService } from "src/app/services/product-service";
// 引入验证用的类四个类
import {FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';

@Component({
    selector: 'auction-search',
    styleUrls: ['./search.css'],
    templateUrl: './search.html'
})
export default class SearchComponent{
    // 入力验证用的的FormGroup
    formModel: FormGroup;
    // 所有种类数组
    categories: string[];

    constructor(private productService: ProductService){
        // 所以种类情报取和，用于生成下拉框select里面的值
        this.categories = productService.getAllCategories();

        const fb = new FormBuilder();
        this.formModel = fb.group({
          'title': [null, Validators.minLength(3)],
          'price': [null, positiveNumberValidator],
           // 默认选第一条数据  
          'category': [-1]
        })
    }

    onSearch(){
        console.log("title: " + this.formModel.hasError('minlength', 'title'));
        console.log("price:" + this.formModel.hasError('positivenumber', 'price'));
        // console.log(this.formModel.value);
    }
}

function positiveNumberValidator(control: FormControl): any {
    if (!control.value) return null;
    const price = parseInt(control.value);
    return price === null ||
      typeof price === 'number' &&
           price > 0 ? null : {positivenumber: true};
  }