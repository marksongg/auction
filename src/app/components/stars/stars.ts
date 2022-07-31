import { Component, Input, OnInit } from "@angular/core";

@Component({
    selector: 'auction-stars',
    styles: [` .starrating { color: #000000; }`],
    templateUrl: './stars.html'
})
export default class StarsComponent implements OnInit {
    @Input() count: number = 5;
    @Input() rating: number = 0;
    stars: boolean[] = [];

    ngOnInit(): void {
        for(let i = 1; i <= this.count; i++) {
            this.stars.push(i > this.rating);
        }
    }
}