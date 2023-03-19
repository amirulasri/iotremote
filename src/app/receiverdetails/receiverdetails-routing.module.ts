import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReceiverdetailsPage } from './receiverdetails.page';

const routes: Routes = [
  {
    path: '',
    component: ReceiverdetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReceiverdetailsPageRoutingModule {}
