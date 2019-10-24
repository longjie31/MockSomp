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
        this.router.navigateByUrl('/auth/login').then();
    }

    // 是否需要加上token
    needAuthToken(url: string): boolean {
        // 比如登录，登出不用验证token
        const array1 = [(MOCK + API.LOGIN)];
        return !array1.includes(url);
    }

    // 更新token
    refreshToken(token): string {
        try {
            const raw = JSON.parse(atob(token));
            raw.delay = moment()
                .add(30, 'minutes')
                .format(FMT.NDT);
            const val = btoa(JSON.stringify(raw));
            this.authScopeService.setToken(val);
            return val;
        } catch (e) {
            this.authScopeService.clearSession();
        }
    }
}
