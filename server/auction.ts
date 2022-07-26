import * as express from "express";
import { Product, getProducts, getAllProducts, getProductById } from "./model";
// 引入webSocket类，另外使用了一个别名WsServer
import { Server as WsServer } from "ws";
import { race } from "rxjs";
import { ɵAPP_ID_RANDOM_PROVIDER } from "@angular/core";
import { LowerCasePipe } from "@angular/common";


// Http请求，websocket服务都在这个类里面
const app = express();

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// 1：根据查询条件，取得商品
app.get('/api/products', (req, res) => 
  {
    // L打印query查询条件
    console.log("req.query : " + JSON.stringify(req.query));
    // 重要：这里固定返回的是JSON格式的对象 
    res.json(getProducts(req.query))
  }
);

// 根据ID，查询商品
// 2022/08/23 重要，不要忘了加上[/]，不然找不到服务
app.get('/api/productbyid', (req, res) => {
   console.log("productbyid" + JSON.stringify(req.query));
   res.json(getProductById(req.query));
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
const server = app.listen(5555, "localhost", () => {
    // 这里使用了es5的析构方法
    console.log(JSON.stringify(server.address()));
    // const {address, port} = server.address();
    // console.log('Listening on %s %s', address, port);
});

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const wsServer:WsServer  = new WsServer({port: 8085});
console.log('WebSocket server is listening on port 8085');
wsServer.on('connection', ws => {
  // 接收消息
  ws.on('message', message => {
    let subscriptionRequest = JSON.parse(message.toString());
    subscribeToProductBids(ws, subscriptionRequest.productId);
  });
})

// 每2秒钟，向订阅人发送最新的订阅信息
setInterval(() => {
  // 更新最新的商品和出价的Map情报
  generateNewBids();
  broadcastNewBidsToSubscrbers();
}, 2000);
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const subscriptions = new Map<any, string[]>();
function subscribeToProductBids(client: any, productId: string) {
    let products = subscriptions.get(client) || [];
    subscriptions.set(client, [...products, productId]);
}

function broadcastNewBidsToSubscrbers(){
  subscriptions.forEach((products: string[], ws: WebSocket) => {
    if(ws.readyState === 1) {
      let newBids = products.map(pid => ({
        productId: pid,
        bid: currentBids.get(pid)
      }));
      // console.log(newBids[0].bid);
      // console.log(newBids[0].productId);
      // console.log(JSON.stringify(currentBids));
      // console.log(JSON.stringify(newBids));
      ws.send(JSON.stringify(newBids));
    } else {
      subscriptions.delete(ws);
    }
  })
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Bid generator

// Map<产品，最新出价>
// 重要，不知道什么原因，原先这里的Map<number, number>，productId定义为number时，取不到bid最新的出价，现在改成使用string作为key
const currentBids = new Map<string, number>();
// 产生新的报价
function generateNewBids() {
  // 取得全部商品进行遍历
  getAllProducts().forEach(p => {
    // 如果出新的出价不在Map中，则使用商品的价格
    const currentBid = currentBids.get(p.id.toString()) || p.price;
    // 调用共通方法random（），计算出最新的出价，另外每次最高加价5元
    const newBid = random(currentBid, currentBid + 5);
    // 将最新的出价更新到Map中
    currentBids.set(p.id.toString(), newBid);
  });
}

// 共通方法，计算新出的出价
function random(low: number, hight: number): number {
  return Math.random() * (hight - low) + low;
}
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
