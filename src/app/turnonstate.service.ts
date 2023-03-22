import { Injectable, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageService } from './storage.service';


@Injectable({
  providedIn: 'root'
})
export class TurnonstateService {

  private gpioCurrentState: any = [];
  public listDevices: any[] = [];
  private apiUrl = 'https://amirulasri.com/iotserver/api';
  private accountToken: string = "";

  constructor(private toastController: ToastController, private http: HttpClient, private storageService: StorageService) {
    this.storageService.getValue('token').then((token: any) => {
      this.accountToken = token;
      this.fetchListDevices(token);
    });
  }

  fetchListDevices(token: string) {
    const jsontoken = { token: this.accountToken };
    this.http.post(`${this.apiUrl}/listdevices`, jsontoken).subscribe(
      (response: any) => {
        this.listDevices = response;
        this.listDevices.forEach(device => {
          device.turnOnState = this.gpioCurrentState[device.gpionumber] == undefined ? 0 : this.gpioCurrentState[device.gpionumber];
        });
        console.log(this.listDevices);
      },
      (error: any) => {
        console.log(error);
        this.presentToast('Error occurred when fething list devices. Please try again');
      }
    );
  }

  setgpioCurrentState(gpionumber: number, state: number) {
    this.gpioCurrentState[gpionumber] = state;
    this.listDevices.forEach(device => {
      device.turnOnState = this.gpioCurrentState[device.gpionumber] == undefined ? 0 : this.gpioCurrentState[device.gpionumber];
    });
    console.log(this.listDevices);
  }

  getgpioCurrentState() {
    return this.gpioCurrentState;
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
