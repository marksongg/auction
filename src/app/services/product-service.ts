import { EventEmitter, Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from "rxjs";

export class Product {
    constructor(
        public id: number,
        public title: string,
        public price: number,
        public rating: number,
        public description: string,
        public categories: Array<string>,
        public img: string) {
    }
}

export class Review {
    constructor(
        public id: number,
        public productId: number,
        public timestamp: Date,
        public user: string,
        public rating: number,
        public comment: string){

    }
}

// 注意，这里是使用了interface来定义了查询条件
export interface ProductSearchParams {
  title: string;
  price: number;
  category: string;
}

// 重要：如果引入了HttpClient，这个@Injectable()一定要引入进来
@Injectable()
export class ProductService {
    searchEvent: EventEmitter<any> = new EventEmitter();

    constructor(private httpClient: HttpClient){

    }

    // 通过HTTP访问
    search(params: ProductSearchParams): Observable<Product[]>{
        // HttpParams对象设置查询条件使用
        let httpParams = new HttpParams();
        // Begin assigning parameters
        // 商品标题
        let tempTitle: string = ""
        if(params.title) {
          tempTitle = params.title;
        };
        httpParams = httpParams.append('title', tempTitle);
        
        // 商品价格
        let tempPrice: number = 0;
        if(params.price){
          tempPrice = params.price;
        }
        httpParams = httpParams.append('price', tempPrice);

        // 商品种类
        httpParams = httpParams.append('category', params.category);

        return this.httpClient.get<Product[]>('/products', {params: httpParams});
    }

    // 生成商品对象数组
    getProducts(): Array<Product> {
        let tempProducts: Array<Product> = products.map(p => new Product(p.id, p.title, p.price, p.rating, p.description, p.categories, p.img));
        return tempProducts;
    }

    // 根据商品ID查询商品
    // 这里返回类型必须要指定为【Product | undefined 】
    getProductById(productId: number): Product | undefined {
        // 现阶段，使用===时，find不到数据，换成==顺利查询到数据
        // find方法返回一个对象
        return products.find(p => p.id == productId);
    }

    // 根据商品ID取得相应的Reviews情报数组
    getReviewsForProduct(productId: number): Review[] | any {
        return reviews.filter(r => r.productId == productId)
        .map(r => new Review(r.id, r.productId, new Date(r.timestamp), r.user, r.rating, r.comment));
    }

    // すべて種類情報を取得する
    getAllCategories(): string[] {
        return ['Books', 'Electronics', 'Hardware'];
    }
}

/**
 * Encodes the object into a valid query string.
 */
 function encodeParams(params: any): URLSearchParams {
    return Object.keys(params)
      .filter(key => params[key])
      .reduce((accum: URLSearchParams, key: string) => {
        accum.append(key, params[key]);
        return accum;
      }, new URLSearchParams());
  }

var products = [
    {
        "id": 1,
        "title": "minca Tote bag",
        "price": 3499,
        "rating": 4.3,
        "description": "革職人・尾花和哉さんが手がける。",
        "categories": ["electronics", "hardware"],
        "img": 'assets/img/prod1.jpg'
    },
    {
        "id": 2,
        "title": "ブランケット「MOZAIC」",
        "price": 6499,
        "rating": 3.5,
        "description": "冨田さんとともに創作活動を行うホリノウチマヨさんの作品。",
        "categories": ["books"],
        "img": 'assets/img/prod2.jpg'
    },
    {
        "id": 3,
        "title": "minca HL-Pen case",
        "price": 799,
        "rating": 4.2,
        "description": "完全ハンドメイドでアナログ感がデザインの箱型のペンケース。",
        "categories": ["electronics"],
        "img": 'assets/img/prod3.jpg'
    },
    {
        "id": 4,
        "title": "テーブルランナー「No.96」",
        "price": 1499,
        "rating": 3.9,
        "description": "富田潤さんが生み出す、日常に溶け込むシンプルな意匠。",
        "categories": ["hardware"],
        "img": 'assets/img/prod4.jpg'
    },
    {
        "id": 5,
        "title": "カップ&ソーサー セット",
        "price": 299,
        "rating": 5,
        "description": "若き陶芸家、青木良太さん作SAKURAティーセット。",
        "categories": ["electronics", "hardware"],
        "img": 'assets/img/prod5.jpg'
    }
];

var reviews = [
    {
      "id": 0,
      "productId": 1,
      "timestamp": "2014-05-20T02:17:00+00:00",
      "user": "沈腾",
      "rating": 5,
      "comment": "Aenean vestibulum velit id placerat posuere. Praesent placerat mi ut massa tempor, sed rutrum metus rutrum. Fusce lacinia blandit ligula eu cursus. Proin in lobortis mi. Praesent pellentesque auctor dictum. Nunc volutpat id nibh quis malesuada. Curabitur tincidunt luctus leo, quis condimentum mi aliquet eu. Vivamus eros metus, convallis eget rutrum nec, ultrices quis mauris. Praesent non lectus nec dui venenatis pretium."
    },
    {
      "id": 1,
      "productId": 1,
      "timestamp": "2014-05-20T02:53:00+00:00",
      "user": "贾玲",
      "rating": 3,
      "comment": "Aenean vestibulum velit id placerat posuere. Praesent placerat mi ut massa tempor, sed rutrum metus rutrum. Fusce lacinia blandit ligula eu cursus. Proin in lobortis mi. Praesent pellentesque auctor dictum. Nunc volutpat id nibh quis malesuada. Curabitur tincidunt luctus leo, quis condimentum mi aliquet eu. Vivamus eros metus, convallis eget rutrum nec, ultrices quis mauris. Praesent non lectus nec dui venenatis pretium."
    },
    {
      "id": 2,
      "productId": 1,
      "timestamp": "2014-05-20T05:26:00+00:00",
      "user": "关晓彤",
      "rating": 4,
      "comment": "Aenean vestibulum velit id placerat posuere. Praesent placerat mi ut massa tempor, sed rutrum metus rutrum. Fusce lacinia blandit ligula eu cursus. Proin in lobortis mi. Praesent pellentesque auctor dictum. Nunc volutpat id nibh quis malesuada. Curabitur tincidunt luctus leo, quis condimentum mi aliquet eu. Vivamus eros metus, convallis eget rutrum nec, ultrices quis mauris. Praesent non lectus nec dui venenatis pretium."
    },
    {
      "id": 3,
      "productId": 1,
      "timestamp": "2014-05-20T07:20:00+00:00",
      "user": "花花",
      "rating": 4,
      "comment": "Aenean vestibulum velit id placerat posuere. Praesent placerat mi ut massa tempor, sed rutrum metus rutrum. Fusce lacinia blandit ligula eu cursus. Proin in lobortis mi. Praesent pellentesque auctor dictum. Nunc volutpat id nibh quis malesuada. Curabitur tincidunt luctus leo, quis condimentum mi aliquet eu. Vivamus eros metus, convallis eget rutrum nec, ultrices quis mauris. Praesent non lectus nec dui venenatis pretium."
    },
    {
      "id": 4,
      "productId": 1,
      "timestamp": "2014-05-20T11:35:00+00:00",
      "user": "宋亚轩",
      "rating": 5,
      "comment": "Aenean vestibulum velit id placerat posuere. Praesent placerat mi ut massa tempor, sed rutrum metus rutrum. Fusce lacinia blandit ligula eu cursus. Proin in lobortis mi. Praesent pellentesque auctor dictum. Nunc volutpat id nibh quis malesuada. Curabitur tincidunt luctus leo, quis condimentum mi aliquet eu. Vivamus eros metus, convallis eget rutrum nec, ultrices quis mauris. Praesent non lectus nec dui venenatis pretium."
    },
    {
      "id": 5,
      "productId": 1,
      "timestamp": "2014-05-20T11:42:00+00:00",
      "user": "宋刚",
      "rating": 5,
      "comment": "Aenean vestibulum velit id placerat posuere. Praesent placerat mi ut massa tempor, sed rutrum metus rutrum. Fusce lacinia blandit ligula eu cursus. Proin in lobortis mi. Praesent pellentesque auctor dictum. Nunc volutpat id nibh quis malesuada. Curabitur tincidunt luctus leo, quis condimentum mi aliquet eu. Vivamus eros metus, convallis eget rutrum nec, ultrices quis mauris. Praesent non lectus nec dui venenatis pretium."
    },
    {
        "id": 0,
        "productId": 2,
        "timestamp": "2014-05-20T11:42:00+00:00",
        "user": "乐宸",
        "rating": 0,
        "comment": "Aenean vestibulum velit id placerat posuere. Praesent placerat mi ut massa tempor, sed rutrum metus rutrum. Fusce lacinia blandit ligula eu cursus. Proin in lobortis mi. Praesent pellentesque auctor dictum. Nunc volutpat id nibh quis malesuada. Curabitur tincidunt luctus leo, quis condimentum mi aliquet eu. Vivamus eros metus, convallis eget rutrum nec, ultrices quis mauris. Praesent non lectus nec dui venenatis pretium."
      }
  ];