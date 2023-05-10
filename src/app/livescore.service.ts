import { Injectable } from '@angular/core';
import { io } from "socket.io-client";
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LivescoreService {
  private url = 'http://167.86.98.176:1443';
    // private url = 'http://localhost:3000';
    private socket;
    public message = [];
    public data = [];
     constructor() {
        this.socket = io(this.url);
    }

    public sendMessage(message: any,jsonarray: any) {
        // console.log(message);
        console.log(jsonarray);
          this.socket.emit('new-message',message,jsonarray);
    }

    public getMessages = () => {
        return Observable.create((observer: { next: (arg0: any) => void; }) => {
            this.socket.on('new-message', (message: any) => {
                observer.next(message);
            });
        });
    }    
}
