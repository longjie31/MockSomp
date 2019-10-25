import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DashbordComponent} from './dashbord.component';


const routes: Routes = [
    {
        path: '',
        component: DashbordComponent,
        children: [
            {
                path: 'user',
                loadChildren: () => import ('./user/user.module').then(mod => mod.UserModule)
            },
            {
                path: 'report',
                loadChildren: () => import('./report/report.module').then(mod => mod.ReportModule)
            },
            {
                path: 'plan',
                loadChildren: () => import('./plan/plan.module').then(mod => mod.PlanModule)
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashbordRoutingModule {
}
