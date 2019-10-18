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
