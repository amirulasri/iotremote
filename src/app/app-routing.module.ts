import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'iotdevices',
    loadChildren: () => import('./iotdevices/iotdevices.module').then( m => m.IotdevicesPageModule)
  },
  {
    path: 'receiverdetails',
    loadChildren: () => import('./receiverdetails/receiverdetails.module').then( m => m.ReceiverdetailsPageModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./about/about.module').then( m => m.AboutPageModule)
  },
  {
    path: 'myprofile',
    loadChildren: () => import('./myprofile/myprofile.module').then( m => m.MyprofilePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'adddevice',
    loadChildren: () => import('./adddevice/adddevice.module').then( m => m.AdddevicePageModule)
  },
  {
    path: 'editdevice/:id',
    loadChildren: () => import('./editdevice/editdevice.module').then( m => m.EditdevicePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
