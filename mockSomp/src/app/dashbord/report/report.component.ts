import {Component, OnInit} from '@angular/core';
import {HttpService} from '../../@auth/services/http.service';

@Component({
    selector: 'app-report',
    templateUrl: './report.component.html',
    styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
    menus: Array<{ router: string, name: string }> = [{router: '', name: ''}];

    constructor(private httpService: HttpService) {
    }

    ngOnInit() {
        this.getMenu();
    }

    // 得到二级菜单
    getMenu() {
        this.httpService.myPost((MOCK + API.REPORT_MENU))
            .subscribe(res => {
                this.menus = res;
            });
    }
}
