import {Injectable} from '@angular/core';
import {CanActivateChild} from '@angular/router';
import {AuthScopeService} from './auth-scope.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivateChild {
    constructor(private authScopeService: AuthScopeService) {
    }

    // 这里我想新建个服务，让登陆时存储用户名，来判断是否继续路由
    canActivateChild() {
        let canActive = true;
        if (this.authScopeService.getUid() !== 'admin') {
            canActive = false;
        }
        // 验证token是否过期
        try {
            const raw = JSON.parse(atob(this.authScopeService.getToken()));
            // 判断是不是超时
            canActive = raw.delay > moment().format(FMT.NDT);
        } catch (e) {
            canActive = false;
        }
        console.log('路由守卫起作用啦');
        return canActive;
    }
}
