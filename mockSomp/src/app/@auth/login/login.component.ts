import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthScopeService} from '../services/auth-scope.service';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
    errorMsg: string;
    user = {username: '', password: ''};

    constructor(private router: Router,
                private authScopeService: AuthScopeService) {
    }


    ngOnInit() {
    }

    login(): void {
        if (this.user.username === 'admin' && this.user.password === 'admin') {
            this.authScopeService.setUid(this.user.username);
            // 此时用到moment就要用到声明全局变量
            const delay = moment().add(30, 'minutes').format(FMT.NDT);
            this.authScopeService.setToken(btoa(JSON.stringify({delay: delay})));
            this.router.navigate(['dashboard']).then();
        } else {
            this.errorMsg = '登录失败';
        }
        /* this.http.post(this.aService.api.login, this.user).subscribe(res => {
             if (res && res['code'] === 1) {
                 this.aService.login(res['data'], res['msg']);
             } else {X
                 this.errorMsg = res['msg'];
             }
         });*/
    }
}
