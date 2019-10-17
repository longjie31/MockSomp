import {Component, OnInit} from '@angular/core';
import {AuthService} from '../@auth/services/auth.service';

@Component({
    selector: 'app-dashbord',
    templateUrl: './dashbord.component.html',
    styleUrls: ['./dashbord.component.less']
})
export class DashbordComponent implements OnInit {

    constructor(private auth: AuthService) {
    }

    ngOnInit() {
    }

    // 退出页面
    logout() {
        this.auth.logout();
    }
}
