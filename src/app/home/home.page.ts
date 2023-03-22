import { Component, OnInit } from '@angular/core';
import { SocketService } from '../socket.service';
import { Socket } from 'socket.io-client';
import { StorageService } from '../storage.service';
import { ToastController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TurnonstateService } from '../turnonstate.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  private socketObject!: Socket;
  useremailaccount: any = localStorage.getItem('iotusername');
  private accountToken: string = "";

  private apiUrl = 'https://amirulasri.com/iotserver/api';

  ngOnInit() {
    this.storageService.getValue('token').then((token) => {
      this.accountToken = token;
    });
  }

  constructor(private http: HttpClient, private socketService: SocketService, private storageService: StorageService, private toastController: ToastController, public turnOnState: TurnonstateService) {
    this.socketObject = this.socketService.getSocket();
  }

  controlDevice(gpionumber: number, checked: any) {
    console.log(gpionumber + ' ' + checked.detail.checked);
    if (checked.detail.checked) {
      this.sendActions(1, gpionumber);
    }else{
      this.sendActions(0, gpionumber);
    }
  }

  sendActions(turnstate: number, gpionumber: number) {
    this.socketObject.emit("sendactions", { action: 'iotcontrol', state: turnstate, gpio: gpionumber, emailaccount: this.useremailaccount });
  }

  getListGPIO() {
    this.socketObject.emit("sendactions", { action: 'listgpio', emailaccount: this.useremailaccount });
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

}
