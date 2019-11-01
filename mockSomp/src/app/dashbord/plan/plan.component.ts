import {Component, OnInit} from '@angular/core';
import {HttpService} from '../../@auth/services/http.service';
import {NzDrawerRef, NzDrawerService} from 'ng-zorro-antd';
import {PlanAddComponent} from './plan-add/plan-add.component';
import {PlanEditComponent} from './plan-edit/plan-edit.component';

@Component({
    selector: 'app-plan',
    templateUrl: './plan.component.html',
    styleUrls: ['./plan.component.less']
})
export class PlanComponent implements OnInit {
    // 增加抽屉
    addDrawer: NzDrawerRef;
    // 修改抽屉
    editDrawer: NzDrawerRef;
    types = []; // 计划类型
    typeId = null; // 当前计划类型
    plans = []; // 计划列表
    loading = false;

    constructor(private httpService: HttpService, private nzDrawService: NzDrawerService) {
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

    // 新建计划
    create() {
        this.addDrawer = this.nzDrawService.create({
            nzTitle: '增加计划',
            nzContent: PlanAddComponent,
            nzMaskClosable: false,
            nzWidth: 520
        });
    }

    // 修改计划
    update(plan: object) {
        this.editDrawer = this.nzDrawService.create({
            nzTitle: '修改计划',
            nzContent: PlanEditComponent,
            nzMaskClosable: false,
            nzWidth: 520
        });
    }
}
