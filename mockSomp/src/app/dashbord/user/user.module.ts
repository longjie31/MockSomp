import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UserRoutingModule} from './user-routing.module';
import {UserComponent} from './user.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {UserAddComponent} from './user-add/user-add.component';
import {UserEditComponent} from './user-edit/user-edit.component';


@NgModule({
    declarations: [UserComponent, UserAddComponent, UserEditComponent],
    imports: [
        CommonModule,
        NgZorroAntdModule,
        UserRoutingModule
    ],
    entryComponents: [UserAddComponent, UserEditComponent]
})
export class UserModule {
}
