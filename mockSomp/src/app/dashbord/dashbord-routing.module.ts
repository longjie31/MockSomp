import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DashbordComponent} from './dashbord.component';


const routes: Routes = [
    {
        path: '',
        component: DashbordComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashbordRoutingModule {
}
