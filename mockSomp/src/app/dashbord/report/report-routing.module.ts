import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ReportComponent} from './report.component';
import {UserComponent} from './user/user.component';
import {ResourceComponent} from './resource/resource.component';


const routes: Routes = [
    {
        path: '',
        component: ReportComponent,
        children: [
            {
                path: 'user',
                component: UserComponent
            },
            {
                path: 'resource',
                component: ResourceComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ReportRoutingModule {
}
