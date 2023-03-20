import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdddevicePageRoutingModule } from './adddevice-routing.module';

import { AdddevicePage } from './adddevice.page';

import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdddevicePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AdddevicePage]
})
export class AdddevicePageModule {}
