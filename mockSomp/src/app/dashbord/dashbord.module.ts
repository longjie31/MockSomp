import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashbordRoutingModule } from './dashbord-routing.module';
import { DashbordComponent } from './dashbord.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';


@NgModule({
  declarations: [DashbordComponent],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    DashbordRoutingModule
  ]
})
export class DashbordModule { }
