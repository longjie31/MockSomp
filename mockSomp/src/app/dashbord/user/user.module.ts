import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import {UserComponent} from './user.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';


@NgModule({
  declarations: [UserComponent],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    UserRoutingModule
  ]
})
export class UserModule { }
