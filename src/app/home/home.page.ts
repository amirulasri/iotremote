import { Component, OnInit } from '@angular/core';
import { SocketService } from '../socket.service';
import { Socket } from 'socket.io-client';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  stateText: string = "";
  private socketObject!: Socket;
  useremailaccount: string = "";
  private accountToken: string = "";

  ngOnInit() {
    this.storageService.getValue('token').then((token) => {
      this.accountToken = token;
    });
    this.useremailaccount = "swc3403@iotuser";
  }

  constructor(private socketService: SocketService, private storageService: StorageService) {
    this.socketService.initSocket();
    this.socketObject = this.socketService.getSocket();
    this.socketObject.on("connect", () => {
      console.log("CONNECTED TO SERVER: " + this.socketObject.id);
      this.socketObject.emit("getdetails", { clienttype: "remotesystem", receiveraccount: this.useremailaccount });
      this.socketObject.emit("joincontrolroom", this.useremailaccount);
    });
    this.socketObject.on("receiveactions", (arg: any) => {
      //LED.writeSync(arg);
      console.log("RECEIVE: " + JSON.stringify(arg));
    });
    this.socketObject.on("receivelistgpio", (arg: any) => {
      console.log("LIST GPIO: " + JSON.stringify(arg));
    });
  }

  sendActions(turnstate: number, gpionumber: number) {
    this.socketObject.emit("sendactions", { action: 'iotcontrol', state: turnstate, gpio: gpionumber, emailaccount: this.useremailaccount });
    console.log("CALLED");
  }

  getListGPIO() {
    console.log("CALLED");
    this.socketObject.emit("sendactions", { action: 'listgpio', emailaccount: this.useremailaccount });
  }

}
