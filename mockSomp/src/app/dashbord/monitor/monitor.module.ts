import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MonitorRoutingModule} from './monitor-routing.module';
import {MonitorComponent} from './monitor.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {NbCardModule, NbThemeModule} from '@nebular/theme';


@NgModule({
    declarations: [MonitorComponent],
    imports: [
        CommonModule,
        MonitorRoutingModule,
        NgZorroAntdModule,
        NbCardModule,
        NbThemeModule
    ]
})
export class MonitorModule {
}
