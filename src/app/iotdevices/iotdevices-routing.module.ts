import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IotdevicesPage } from './iotdevices.page';

const routes: Routes = [
  {
    path: '',
    component: IotdevicesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IotdevicesPageRoutingModule {}
