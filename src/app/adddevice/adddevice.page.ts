import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageService } from '../storage.service';
import { ToastController, LoadingController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Socket } from 'socket.io-client';
import { SocketService } from '../socket.service';
import { NavController } from '@ionic/angular';

interface ResponseStateType {
  success: boolean,
  desc: string
}

@Component({
  selector: 'app-adddevice',
  templateUrl: './adddevice.page.html',
  styleUrls: ['./adddevice.page.scss'],
})
export class AdddevicePage implements OnInit {
  private socketObject!: Socket;
  newdeviceform: FormGroup;
  private accountToken: string = "";
  private apiUrl = 'https://amirulasri.com/iotserver/api';
  private loadingSpinner: any;
  useremailaccount: any = localStorage.getItem('iotusername');
  listgpiovalue: number[] = [];

  constructor(private navCtrl: NavController, private fb: FormBuilder, private http: HttpClient, private toastController: ToastController, private loadingController: LoadingController, private storageService: StorageService, private socketService: SocketService) {
    this.storageService.getValue('token').then((token) => {
      this.accountToken = token;
    });
    this.newdeviceform = this.fb.group({
      devicename: ['', Validators.required],
      devicetype: ['', Validators.required],
      gpiopin: ['', Validators.required],
      description: [''],
    });
  }

  ngOnInit() {
    this.createLoadingSpinnerObj();
  }

  addNewDevice() {
    this.newdeviceform.value["token"] = this.accountToken;
    if (this.newdeviceform.valid) {
      this.loadingSpinner.present();
      this.http.post<ResponseStateType>(`${this.apiUrl}/adddevices`, this.newdeviceform.value).subscribe(
        (response) => {
          this.loadingSpinner.dismiss();
          if (response.success) {
            this.presentToast('Add device successful');
            this.navCtrl.back();
          } else {
            this.presentToast('Add device failed: ' + response.desc);
          }
        },
        (error) => {
          this.loadingSpinner.dismiss();
          console.log(error);
          this.presentToast('Error occurred when adding new devices. Please try again');
        }
      );
    }
  }

  ionViewWillEnter() {
    if (this.listgpiovalue.length < 1) {
      this.listgpiovalue = this.socketService.getListGPIO();
    }
  }

  ionViewDidLeave() {
    this.newdeviceform.patchValue({ gpiopin: '' });
  }

  async createLoadingSpinnerObj() {
    this.loadingSpinner = await this.loadingController.create({
      message: 'Please wait...',
      spinner: 'crescent',
      duration: 2000
    });
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