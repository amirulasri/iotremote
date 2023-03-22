import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageService } from '../storage.service';
import { ToastController, LoadingController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Socket } from 'socket.io-client';
import { SocketService } from '../socket.service';
import { ActivatedRoute } from '@angular/router';

interface ResponseStateType {
  success: boolean,
  desc: string
}

@Component({
  selector: 'app-editdevice',
  templateUrl: './editdevice.page.html',
  styleUrls: ['./editdevice.page.scss'],
})
export class EditdevicePage implements OnInit {
  private socketObject!: Socket;
  editeddeviceform: FormGroup;
  private accountToken: string = "";
  private apiUrl = 'https://amirulasri.com/iotserver/api';
  private loadingSpinner: any;
  useremailaccount: any = localStorage.getItem('iotusername');
  listgpiovalue: number[] = [];
  deviceid: any;
  dataDevice: any = {};

  constructor(private actRoute: ActivatedRoute, private fb: FormBuilder, private http: HttpClient, private toastController: ToastController, private loadingController: LoadingController, private storageService: StorageService, private socketService: SocketService) {
    this.storageService.getValue('token').then((token) => {
      this.accountToken = token;
      this.deviceid = this.actRoute.snapshot.paramMap.get('id');
      this.fetchCurrentSelectedDevice(this.deviceid);
    });
    this.editeddeviceform = this.fb.group({
      devicename: ['', Validators.required],
      devicetype: ['', Validators.required],
      gpiopin: ['', Validators.required],
      description: [''],
    });
  }

  ngOnInit() {
    this.createLoadingSpinnerObj();
  }

  editAddedDevice() {
    this.editeddeviceform.value["token"] = this.accountToken;
    this.editeddeviceform.value["id"] = this.deviceid;
    if (this.editeddeviceform.valid) {
      this.loadingSpinner.present();
      this.http.post<ResponseStateType>(`${this.apiUrl}/updatedevices`, this.editeddeviceform.value).subscribe(
        (response) => {
          this.loadingSpinner.dismiss();
          if (response.success) {
            this.presentToast('Add device successful');
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

  fetchCurrentSelectedDevice(deviceid: any) {
    const jsontoken = { token: this.accountToken, id: deviceid };
    this.http.post(`${this.apiUrl}/getdevices`, jsontoken).subscribe(
      (response: any) => {
        this.dataDevice = response;
        console.log(response);
      },
      (error) => {
        console.log(error);
        this.presentToast('Error occurred when fething list devices. Please try again');
      }
    );
  }

  ionViewDidLeave() {
    this.editeddeviceform.patchValue({ gpiopin: '' });
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
