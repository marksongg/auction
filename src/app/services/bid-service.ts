import { Injectable } from "@angular/core";
import { Observable, Subscriber } from "rxjs";
import { WebSocketService } from "./websocket-service";

@Injectable()
export class BidService {
    constructor(){
        
    }

     private ws!: WebSocket;

    createObservableSocket(url: string, openSubscriber: Subscriber<any>): Observable<any>{
        this.ws = new WebSocket(url);
        return new Observable(observer => {
            this.ws.onmessage = event => observer.next(event.data);
            this.ws.onerror = event => observer.error(event);
            this.ws.onclose = event => observer.complete();
            this.ws.onopen = event => {
                openSubscriber.next();
                openSubscriber.complete();
            }

            return () => this.ws.close();
        });
    }

    send(message: any) {
        this.ws.send(JSON.stringify(message));
    }

    watchProduct(productId: number): Observable<any>{
        let openSubscriber = Subscriber.create(() => this.send({productId: productId}));

        return this.createObservableSocket('ws://localhost:8085', openSubscriber)
    }
}