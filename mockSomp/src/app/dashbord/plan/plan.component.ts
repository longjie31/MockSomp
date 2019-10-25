import {Component, OnInit} from '@angular/core';
import {HttpService} from '../../@auth/services/http.service';

@Component({
    selector: 'app-plan',
    templateUrl: './plan.component.html',
    styleUrls: ['./plan.component.less']
})
export class PlanComponent implements OnInit {
    types = []; // 计划类型
    typeId = null; // 当前计划类型
    plans = []; // 计划列表
    loading = false;
    constructor(private httpService: HttpService) {
    }

    ngOnInit() {
        this.getLeftMenu();
    }

    // 得到左侧菜单数据
    getLeftMenu() {
        this.httpService.myPost((MOCK + API.PLAN_LEFT_MENU), {}).subscribe(res => {
            if (res !== -1) {
                this.types = res;
                this.typeId = res[0].id;
                this.getTab(this.typeId);
            }
        });
    }

    // 得到右侧列表
    getTab(typeId) {
        this.httpService.myPost((MOCK + API.PLAN_LIST), {typeId}).subscribe(res => {
            if (res !== -1) {
                this.plans = res;
            }
        });
    }
}
