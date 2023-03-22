import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditdevicePageRoutingModule } from './editdevice-routing.module';

import { EditdevicePage } from './editdevice.page';

import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditdevicePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [EditdevicePage]
})
export class EditdevicePageModule {}
