import {LoginComponent} from './login/login.component';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AuthRoutingModule} from './@auth-routing.module';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {FormsModule} from '@angular/forms';
import {QRCodeModule} from 'angularx-qrcode';


@NgModule({
    declarations: [LoginComponent],
    imports: [
        CommonModule,
        FormsModule,
        NgZorroAntdModule,
        QRCodeModule,
        AuthRoutingModule
    ]
})
export class AuthModule {
}
