import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IotdevicesPageRoutingModule } from './iotdevices-routing.module';

import { IotdevicesPage } from './iotdevices.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IotdevicesPageRoutingModule
  ],
  declarations: [IotdevicesPage]
})
export class IotdevicesPageModule {}
