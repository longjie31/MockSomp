import {LoginComponent} from './login/login.component';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AuthRoutingModule} from './@auth-routing.module';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {QRCodeModule} from 'angularx-qrcode';
import {SignupComponent} from './signup/signup.component';


@NgModule({
    declarations: [LoginComponent, SignupComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgZorroAntdModule,
        QRCodeModule,
        AuthRoutingModule
    ]
})
export class AuthModule {
}
