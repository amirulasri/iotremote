import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageService } from '../storage.service';
import { ToastController, LoadingController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Socket } from 'socket.io-client';
import { SocketService } from '../socket.service';

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
  useremailaccount: string = "";
  listgpiovalue: number[] = [];

  constructor(private fb: FormBuilder, private http: HttpClient, private toastController: ToastController, private loadingController: LoadingController, private storageService: StorageService, private socketService: SocketService) {
    this.newdeviceform = this.fb.group({
      devicename: ['', Validators.required],
      devicetype: ['', Validators.required],
      gpiopin: ['', Validators.required],
      description: [''],
    });
    this.socketService.initSocket();
    this.socketObject = this.socketService.getSocket();
    this.socketObject.on("connect", () => {
      console.log("CONNECTED TO SERVER: " + this.socketObject.id);
      this.socketObject.emit("getdetails", { clienttype: "remotesystem", receiveraccount: this.useremailaccount });
      this.socketObject.emit("joincontrolroom", this.useremailaccount);
      this.getListGPIO();
    });
    this.socketObject.on("receivelistgpio", (arg: any) => {
      console.log("LIST GPIO: " + JSON.stringify(arg));
      this.listgpiovalue = arg.listgpio;
    });
  }

  ngOnInit() {
    this.createLoadingSpinnerObj();
    this.useremailaccount = "swc3403@iotuser";
  }

  addNewDevice() {

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
  getListGPIO() {
    this.socketObject.emit("sendactions", { action: 'listgpio', emailaccount: this.useremailaccount });
  }

}