import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private socket!: Socket;

  constructor() { }

  initSocket(): void {
    this.socket = io('http://192.168.0.237:4000');
  }

  getSocket(): Socket {
    return this.socket;
  }
}
