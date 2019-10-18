import {Component, OnInit} from '@angular/core';
import {AuthService} from '../@auth/services/auth.service';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.less']
})
export class AdminComponent implements OnInit {

    constructor(private auth: AuthService) {
    }

    ngOnInit() {
    }

    // 退出页面
    logout() {
        this.auth.logout();
    }
}
