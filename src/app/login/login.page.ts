import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToastController, LoadingController } from '@ionic/angular';
import { StorageService } from '../storage.service';
import { NavController } from '@ionic/angular';

interface LoginResponse {
  success: boolean,
  desc: string,
  token: string
}

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public loginForm: FormGroup;
  private loadingSpinner: any;
  private apiUrl = 'https://amirulasri.com/iotserver/api';

  constructor(
    private formBuilder: FormBuilder, private http: HttpClient, private toastController: ToastController, private loadingController: LoadingController, private storageService: StorageService, private navCtrl: NavController
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.createLoadingSpinnerObj();
  }

  ionViewWillEnter() {
    this.storageService.getValue('token').then((token) => {
      if(token != null && token != ''){
        console.log('TOKEN AVAILABLE');
        this.navCtrl.navigateRoot('/home');
      }
    });
  }

  public login(): void {
    if (this.loginForm.valid) {
      this.loadingSpinner.present();
      this.http.post<LoginResponse>(`${this.apiUrl}/login`, this.loginForm.value).subscribe(
        (response) => {
          this.loadingSpinner.dismiss();
          if (response.success) {
            this.storageService.setValue('token', response.token);
            localStorage.setItem('iotusername', this.loginForm.value['username']);
            this.navCtrl.navigateRoot('/home');
          } else {
            this.presentToast('Login failed: ' + response.desc);
          }
        },
        (error) => {
          this.loadingSpinner.dismiss();
          console.log(error);
          this.presentToast('Error occurred when register. Please try again');
        }
      );
    }
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
