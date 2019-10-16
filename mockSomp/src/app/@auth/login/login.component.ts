import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
    errorMsg: string;
    user = {username: '', password: ''};

    constructor() {
    }


    ngOnInit() {
    }

    login(): void {
        if (this.user.username === 'admin' && this.user.password === 'admin') {
            this.errorMsg = '登录成功';
        } else {
            this.errorMsg = '登录失败';
        }
        /* this.http.post(this.aService.api.login, this.user).subscribe(res => {
             if (res && res['code'] === 1) {
                 this.aService.login(res['data'], res['msg']);
             } else {
                 this.errorMsg = res['msg'];
             }
         });*/
    }
}
