import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthScopeService} from '../services/auth-scope.service';
import {HttpClient} from '@angular/common/http';
import {HttpService} from '../services/http.service';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
    errorMsg: string;
    user = {username: '', password: ''};

    constructor(private router: Router,
                private authScopeService: AuthScopeService,
                private http: HttpClient,
                private httpService: HttpService) {
    }


    ngOnInit() {
    }

    login(): void {
        if (this.user.username === 'admin' && this.user.password === 'admin') {
            this.httpService.myPost((MOCK + API.LOGIN))
                .subscribe(res => {
                    if (res !== -1) {
                        this.authScopeService.setUid(this.user.username);
                        // 此时用到moment就要用到声明全局变量
                        const delay = moment()
                            .add(30, 'minutes')
                            .format(FMT.NDT);
                        this.authScopeService.setToken(btoa(JSON.stringify({delay: delay})));
                        this.router.navigate(['/dashboard/user']).then();
                    } else {
                        this.errorMsg = '登录失败';
                    }
                });
        } else {
            this.errorMsg = '账号密码有误';
        }
    }
}
