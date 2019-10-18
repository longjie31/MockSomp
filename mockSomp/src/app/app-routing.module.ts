import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuardService} from './@auth/services/auth-guard.service';

const routes: Routes = [
    {
        path: 'auth',
        loadChildren: () => import('./@auth/@auth.module').then(mod => mod.AuthModule),
    },
    {
        path: 'dashboard',
        canActivateChild: [AuthGuardService],
        loadChildren: () => import('./dashbord/dashbord.module').then(mod => mod.DashbordModule)
    },
    {
        path: 'admin',
        canActivateChild: [AuthGuardService],
        loadChildren: () => import('./admin/admin.module').then(mod => mod.AdminModule)
    },
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
