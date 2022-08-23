import { Injectable } from "@angular/core";
import { Observable, Subscriber } from "rxjs";
import { WebSocketService } from "./websocket-service";

@Injectable()
export class BidService {
    constructor(private webSocket: WebSocketService){
        
    }

    watchProduct(productId: number): Observable<any>{
        let openSubscriber = Subscriber.create(() => this.webSocket.send({productId: productId}));

        return this.webSocket.createObservableSocket('ws://localhost:8085', openSubscriber)
    }
}