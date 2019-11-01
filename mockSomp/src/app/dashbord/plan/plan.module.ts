import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PlanRoutingModule} from './plan-routing.module';
import {PlanComponent} from './plan.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PlanAddComponent} from './plan-add/plan-add.component';
import { PlanEditComponent } from './plan-edit/plan-edit.component';


@NgModule({
    declarations: [PlanComponent, PlanAddComponent, PlanEditComponent],
    imports: [
        CommonModule,
        NgZorroAntdModule,
        FormsModule,
        ReactiveFormsModule,
        PlanRoutingModule
    ],
    entryComponents: [
        PlanAddComponent,
        PlanEditComponent
    ]
})
export class PlanModule {
}
