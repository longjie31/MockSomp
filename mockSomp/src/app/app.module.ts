import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {NgZorroAntdModule, NZ_I18N, zh_CN} from 'ng-zorro-antd';
import {AppComponent} from './app.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import zh from '@angular/common/locales/zh';
import {registerLocaleData} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

registerLocaleData(zh);

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        BrowserModule,
        FormsModule,
        HttpClientModule,
        NgZorroAntdModule,
        AppRoutingModule
    ],
    bootstrap: [AppComponent],
    /** 配置 ng-zorro-antd 国际化（文案 及 日期） **/
    providers: [
        {provide: NZ_I18N, useValue: zh_CN}
    ]
})
export class AppModule {
}
