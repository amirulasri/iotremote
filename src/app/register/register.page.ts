import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToastController, LoadingController } from '@ionic/angular';
import { StorageService } from '../storage.service';
import { NavController } from '@ionic/angular';

interface RegisterResponse {
  success: boolean,
  desc: string,
  token: string
}

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  private accountToken: string = "";
  private apiUrl = 'https://amirulasri.com/iotserver/api';
  registerForm: FormGroup;

  private loadingSpinner: any;

  constructor(private fb: FormBuilder, private http: HttpClient, private toastController: ToastController, private loadingController: LoadingController, private storageService: StorageService, private navCtrl: NavController) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      fullname: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.createLoadingSpinnerObj();
  }

  onRegister() {
    this.loadingSpinner.present();
    const formData = this.registerForm.value;
    this.registerUser(formData);
  }

  registerUser(user: any) {
    if (this.registerForm.valid) {
      this.http.post<RegisterResponse>(`${this.apiUrl}/register`, user).subscribe(
        (response) => {
          this.loadingSpinner.dismiss();
          if (response.success) {
            this.storageService.setValue('token', response.token);
            this.presentToast('Register successful');
            this.navCtrl.navigateRoot('/home');
          } else {
            this.presentToast('Register failed: ' + response.desc);
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
