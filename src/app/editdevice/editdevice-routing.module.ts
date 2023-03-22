import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditdevicePage } from './editdevice.page';

const routes: Routes = [
  {
    path: '',
    component: EditdevicePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditdevicePageRoutingModule {}
