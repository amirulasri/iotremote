import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdddevicePage } from './adddevice.page';

const routes: Routes = [
  {
    path: '',
    component: AdddevicePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdddevicePageRoutingModule {}
