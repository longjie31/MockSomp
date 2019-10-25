import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PlanRoutingModule} from './plan-routing.module';
import {PlanComponent} from './plan.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {FormsModule} from '@angular/forms';


@NgModule({
    declarations: [PlanComponent],
    imports: [
        CommonModule,
        NgZorroAntdModule,
        FormsModule,
        PlanRoutingModule
    ]
})
export class PlanModule {
}
