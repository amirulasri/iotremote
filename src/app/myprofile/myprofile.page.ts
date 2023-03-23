import { Component, OnInit } from '@angular/core';
import { StorageService } from '../storage.service';
import { ToastController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.page.html',
  styleUrls: ['./myprofile.page.scss'],
})
export class MyprofilePage implements OnInit {
  private apiUrl = 'https://amirulasri.com/iotserver/api';
  userData: any = {};
  useremailaccount: any = localStorage.getItem('iotusername');

  constructor(private storageService: StorageService, private toastController: ToastController, private http: HttpClient, private navCtrl: NavController) {
    this.storageService.getValue('token').then((token) => {
      this.fetchUserProfile(token);
    });
  }

  ngOnInit() {
  }

  fetchUserProfile(token: string) {
    const jsontoken = { token: token };
    this.http.post(`${this.apiUrl}/getprofile`, jsontoken).subscribe(
      (response: any) => {
        this.userData = response;
        console.log(response);
      },
      (error: any) => {
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

  logOut() {
    this.storageService.setValue('token', '');
    this.navCtrl.navigateRoot('/login');
  }

}
