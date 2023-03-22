import { Component, OnInit } from '@angular/core';
import { SocketService } from '../socket.service';
import { Socket } from 'socket.io-client';

@Component({
  selector: 'app-receiverdetails',
  templateUrl: './receiverdetails.page.html',
  styleUrls: ['./receiverdetails.page.scss'],
})
export class ReceiverdetailsPage implements OnInit {
  private socketObject!: Socket;
  useremailaccount: any = localStorage.getItem('iotusername');
  receiverDetail: any = {emailaccount: 'No receiver', receiverdetail: {status: 'Offline'}};

  constructor(private socketService: SocketService) {
    this.socketObject = this.socketService.getSocket();
  }

  ionViewWillEnter() {
    this.socketService.getSocket().emit("sendactions", { action: 'receiverdetail', emailaccount: this.useremailaccount });
  }

  ionViewDidEnter() {
    const receiverdata = this.socketService.getReceiverDetail();
    console.log(receiverdata);
    if(Object.keys(receiverdata).length > 0){
      this.receiverDetail = receiverdata;
    }
  }

  ngOnInit() {
  }

}
