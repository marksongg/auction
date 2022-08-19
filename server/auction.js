"use strict";
exports.__esModule = true;
exports.Product = void 0;
var express = require("express");
var app = express();
var Product = /** @class */ (function () {
    function Product(id, title, price, rating, description, categories, img) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.rating = rating;
        this.description = description;
        this.categories = categories;
        this.img = img;
    }
    return Product;
}());
exports.Product = Product;
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
// (HttpClient.get请求)根据查询条件查询商品信息
function getProducts(params) {
    if (params === void 0) { params = {}; }
    var result = products;
    // 标题过滤
    if (params.title) {
        result = result.filter(function (p) { return p.title.toLowerCase().indexOf(params.title.toLowerCase()) !== -1; });
    }
    // 价格过滤
    if (parseInt(params.price) && result.length > 0) {
        result = result.filter(function (p) { return p.price <= parseInt(params.price); });
    }
    // 种类过滤
    if (params.category !== '-1' && result.length > 0) {
        result = result.filter(function (p) { return p.categories.indexOf(params.category.toLowerCase()) !== -1; });
    }
    return result;
}
// 根据ID查询数据（TODO）
function getProductById(productId) {
    return products.find(function (p) { return p.id === productId; });
}
// 1：主页服务
// app.get('/', (req, res) => res.send('The URL for products is http://localhost:8000/products'));
// 一定别忘加上斜杠[\]
// 2：全部商品服务
app.get('/products', function (req, res) {
    // L打印query查询条件
    console.log("req.query : " + JSON.stringify(req.query));
    // 重要：这里固定返回的是JSON格式的对象 
    res.json(getProducts(req.query));
});
// 3：根据id查过商品服务
app.get('/products/:id', function (req, res) { res.json(getProductById(parseInt(req.params.id))); });
// 启动服务
// 这里的端口号需要和five serve的端口号一致
var server = app.listen(5555, "localhost", function () {
    // 这里使用了es5的析构方法
    console.log(JSON.stringify(server.address()));
    // const {address, port} = server.address();
    // console.log('Listening on %s %s', address, port);
});
