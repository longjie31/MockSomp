import {Injectable} from '@angular/core';
import {AuthScopeService} from './auth-scope.service';
import {Router} from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private authScopeService: AuthScopeService,
                private router: Router) {
    }

    logout() {
        this.authScopeService.clearSession();
        this.router.navigateByUrl('login').then();
    }
}
