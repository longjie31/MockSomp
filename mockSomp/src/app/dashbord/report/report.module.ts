import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ReportRoutingModule} from './report-routing.module';
import {ReportComponent} from './report.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {UserComponent} from './user/user.component';
import {ResourceComponent} from './resource/resource.component';


@NgModule({
    declarations: [ReportComponent, UserComponent, ResourceComponent],
    imports: [
        CommonModule,
        NgZorroAntdModule,
        ReportRoutingModule
    ]
})
export class ReportModule {
}
