import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
    selector: 'auction-stars',
    styles: [` .starrating { color: #d17581; }`],
    templateUrl: './stars.html'
})
export default class StarsComponent {
    private _rating: number = 0;
    stars: boolean[] = [];

    private maxStars: number = 5;

    // 输入参数
    // 输入参数1
    @Input() readonly: boolean = true;

    // 输入参数2
    // rating的设置器set，访问器get的设定
    @Input() get rating(): number{
        return this._rating;
    }
    set rating(value: number) {
        this._rating = value || 0;
        this.stars = Array(this.maxStars).fill(true, 0, this.rating);
    }

    // EventEmitter<T>,必须指定T的类型，否则编译不过
    // 输出点星的个数
    @Output() ratingChange: EventEmitter<number> = new EventEmitter();

    fillStarsWithColor(index: number){
        if(!this.readonly) {
            this.rating = index + 1;
            // 下面的代码加不加，不会影响表示
            this.ratingChange.emit(this.rating);
        }
    }
}