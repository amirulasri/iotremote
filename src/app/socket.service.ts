import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { StorageService } from './storage.service';
import { TurnonstateService } from './turnonstate.service';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private socket!: Socket;
  useremailaccount: any = localStorage.getItem('iotusername');
  private listgpiovalue: number[] = [];
  private receiverDetails: any[] = [];

  constructor(private storageService: StorageService, private turnOnState: TurnonstateService) {
    this.socket = io('http://amirulasri.com:4000');
    this.socket.on("connect", () => {
      console.log("CONNECTED TO SERVER: " + this.socket.id);
      this.socket.emit("getdetails", { clienttype: "remotesystem", receiveraccount: this.useremailaccount });
      this.socket.emit("joincontrolroom", this.useremailaccount);
      this.socket.emit("sendactions", { action: 'listgpio', emailaccount: this.useremailaccount });
    });
    this.socket.on("receiveactions", (arg: any) => {
      //LED.writeSync(arg);
      console.log("RECEIVE: " + JSON.stringify(arg));
      turnOnState.setgpioCurrentState(arg.gpio, arg.state);
      console.log(turnOnState.getgpioCurrentState());
    });
    this.socket.on("receivelistgpio", (arg: any) => {
      this.listgpiovalue = arg.listgpio;
    });
    this.socket.on("receivereceiverdetails", (arg: any) => {
      this.receiverDetails = arg;
    });
  }

  initSocket(): void {
    this.socket = io('http://192.168.0.237:4000');
  }

  getSocket(): Socket {
    return this.socket;
  }

  getListGPIO(): number[] {
    return this.listgpiovalue;
  }

  getReceiverDetail() {
    return this.receiverDetails;
  }
}
