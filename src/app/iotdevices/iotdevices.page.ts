import { Component, OnInit } from '@angular/core';
import { StorageService } from '../storage.service';
import { ToastController, LoadingController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-iotdevices',
  templateUrl: './iotdevices.page.html',
  styleUrls: ['./iotdevices.page.scss'],
})

export class IotdevicesPage implements OnInit {
  private accountToken: string = "";
  private apiUrl = 'https://amirulasri.com/iotserver/api';
  listDevices: any[] = [];

  constructor(private http: HttpClient, private toastController: ToastController, private storageService: StorageService) {
    this.storageService.getValue('token').then((token) => {
      this.accountToken = token;
    });
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    const jsontoken = { token: this.accountToken };
    this.http.post(`${this.apiUrl}/listdevices`, jsontoken).subscribe(
      (response: any) => {
        this.listDevices = response;
      },
      (error) => {
        console.log(error);
        this.presentToast('Error occurred when fething list devices. Please try again');
      }
    );
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
