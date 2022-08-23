"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
var express = require("express");
var model_1 = require("./model");
// 引入webSocket类，另外使用了一个别名WsServer
var ws_1 = require("ws");
// Http请求，websocket服务都在这个类里面
var app = express();
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// 1：根据查询条件，取得商品
app.get('/api/products', function (req, res) {
    // L打印query查询条件
    console.log("req.query : " + JSON.stringify(req.query));
    // 重要：这里固定返回的是JSON格式的对象 
    res.json((0, model_1.getProducts)(req.query));
});
// 根据ID，查询商品
// 2022/08/23 重要，不要忘了加上[/]，不然找不到服务
app.get('/api/productbyid', function (req, res) {
    console.log("productbyid" + JSON.stringify(req.query));
    res.json((0, model_1.getProductById)(req.query));
});
// 2：主页服务
// app.get('/', (req, res) => res.send('The URL for products is http://localhost:8000/products'));
// 一定别忘加上斜杠[\]
// // 3：根据id查过商品服务
// app.get('/products/:id', (req, res) => 
//   {res.json(getProductById(parseInt(req.params.id)))}
// );
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// 1 HttpClient相关请求，启动服务
// 这里的端口号需要和five serve的端口号一致
var server = app.listen(5555, "localhost", function () {
    // 这里使用了es5的析构方法
    console.log(JSON.stringify(server.address()));
    // const {address, port} = server.address();
    // console.log('Listening on %s %s', address, port);
});
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
var wsServer = new ws_1.Server({ port: 8085 });
console.log('WebSocket server is listening on port 8085');
wsServer.on('connection', function (ws) {
    // 接收消息
    ws.on('message', function (message) {
        var subscriptionRequest = JSON.parse(message.toString());
        subscribeToProductBids(ws, subscriptionRequest.productId);
    });
});
// 每2秒钟，向订阅人发送最新的订阅信息
setInterval(function () {
    // 更新最新的商品和出价的Map情报
    generateNewBids();
    broadcastNewBidsToSubscrbers();
}, 2000);
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
var subscriptions = new Map();
function subscribeToProductBids(client, productId) {
    var products = subscriptions.get(client) || [];
    subscriptions.set(client, __spreadArray(__spreadArray([], products, true), [productId], false));
}
function broadcastNewBidsToSubscrbers() {
    subscriptions.forEach(function (products, ws) {
        if (ws.readyState === 1) {
            var newBids = products.map(function (pid) { return ({
                productId: pid,
                bid: currentBids.get(pid)
            }); });
            // console.log(newBids[0].bid);
            // console.log(newBids[0].productId);
            // console.log(JSON.stringify(currentBids));
            // console.log(JSON.stringify(newBids));
            ws.send(JSON.stringify(newBids));
        }
        else {
            subscriptions["delete"](ws);
        }
    });
}
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Bid generator
// Map<产品，最新出价>
// 重要，不知道什么原因，原先这里的Map<number, number>，productId定义为number时，取不到bid最新的出价，现在改成使用string作为key
var currentBids = new Map();
// 产生新的报价
function generateNewBids() {
    // 取得全部商品进行遍历
    (0, model_1.getAllProducts)().forEach(function (p) {
        // 如果出新的出价不在Map中，则使用商品的价格
        var currentBid = currentBids.get(p.id.toString()) || p.price;
        // 调用共通方法random（），计算出最新的出价，另外每次最高加价5元
        var newBid = random(currentBid, currentBid + 5);
        // 将最新的出价更新到Map中
        currentBids.set(p.id.toString(), newBid);
    });
}
// 共通方法，计算新出的出价
function random(low, hight) {
    return Math.random() * (hight - low) + low;
}
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
