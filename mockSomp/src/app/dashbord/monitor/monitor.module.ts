import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MonitorRoutingModule} from './monitor-routing.module';
import {MonitorComponent} from './monitor.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';


@NgModule({
    declarations: [MonitorComponent],
    imports: [
        CommonModule,
        MonitorRoutingModule,
        NgZorroAntdModule
    ]
})
export class MonitorModule {
}
