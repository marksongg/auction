"use strict";
exports.__esModule = true;
var express = require("express");
var model_1 = require("./model");
var app = express();
// // 根据ID查询数据（TODO）
// function getProductById(productId: number): Product {
//     return products.find(p => p.id === productId);
// }
// 1：主页服务
// app.get('/', (req, res) => res.send('The URL for products is http://localhost:8000/products'));
// 一定别忘加上斜杠[\]
// 2：全部商品服务
app.get('/products', function (req, res) {
    // L打印query查询条件
    console.log("req.query : " + JSON.stringify(req.query));
    // 重要：这里固定返回的是JSON格式的对象 
    res.json((0, model_1.getProducts)(req.query));
});
// // 3：根据id查过商品服务
// app.get('/products/:id', (req, res) => 
//   {res.json(getProductById(parseInt(req.params.id)))}
// );
// 启动服务
// 这里的端口号需要和five serve的端口号一致
var server = app.listen(5555, "localhost", function () {
    // 这里使用了es5的析构方法
    console.log(JSON.stringify(server.address()));
    // const {address, port} = server.address();
    // console.log('Listening on %s %s', address, port);
});
