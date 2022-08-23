import { Injectable } from "@angular/core";
import { Observable, Subscriber } from "rxjs";
import { WebSocketService } from "./websocket-service";

@Injectable()
export class BidService {
    constructor(private ws: WebSocketService){
        
    }

    private url: string = 'ws://localhost:8085';

    watchProduct(productId: number): Observable<any>{
        let openSubscriber = Subscriber.create(() => this.ws.send({productId: productId}));

        // 'ws://localhost:8085'
        return this.ws.createObservableSocket(this.url, openSubscriber)
    }
}