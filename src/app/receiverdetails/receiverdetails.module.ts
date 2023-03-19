import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReceiverdetailsPageRoutingModule } from './receiverdetails-routing.module';

import { ReceiverdetailsPage } from './receiverdetails.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReceiverdetailsPageRoutingModule
  ],
  declarations: [ReceiverdetailsPage]
})
export class ReceiverdetailsPageModule {}
