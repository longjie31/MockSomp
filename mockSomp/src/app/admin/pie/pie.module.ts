import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PieRoutingModule } from './pie-routing.module';
import { PieComponent } from './pie.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';


@NgModule({
  declarations: [PieComponent],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    PieRoutingModule
  ]
})
export class PieModule { }
