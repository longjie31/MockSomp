import {Component, OnInit} from '@angular/core';
import {NzDrawerRef, NzDrawerService, NzFormatEmitEvent, NzTreeNode} from 'ng-zorro-antd';
import {UserAddComponent} from './user-add/user-add.component';
import {UserEditComponent} from './user-edit/user-edit.component';
import {HttpService} from '../../@auth/services/http.service';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
    // 增加抽屉
    userAddDrawer: NzDrawerRef;
    // 修改抽屉
    userEditDrawer: NzDrawerRef;
    // 树节点数据
    nodes = [
        {
            title: 'parent 1',
            key: '100',
            expanded: true,
            icon: 'anticon anticon-smile-o',
            children: [
                {title: 'leaf', key: '1001', icon: 'anticon anticon-meh-o', isLeaf: true},
                {title: 'leaf', key: '1002', icon: 'anticon anticon-frown-o', isLeaf: true}
            ]
        }
    ];
    // 当前树节点
    currentNode: NzTreeNode;
    listOfSelection = [
        {
            text: 'Select All Row',
            onSelect: () => {
                this.checkAll(true);
            }
        },
        {
            text: 'Select Odd Row',
            onSelect: () => {
                this.listOfDisplayData.forEach((data, index) => (this.mapOfCheckedId[data.id] = index % 2 !== 0));
                this.refreshStatus();
            }
        },
        {
            text: 'Select Even Row',
            onSelect: () => {
                this.listOfDisplayData.forEach((data, index) => (this.mapOfCheckedId[data.id] = index % 2 === 0));
                this.refreshStatus();
            }
        }
    ];
    isAllDisplayDataChecked = false;
    isIndeterminate = false;
    listOfDisplayData = [];
    listOfAllData = [];
    mapOfCheckedId: { [key: string]: boolean } = {};

    currentPageDataChange($event): void {
        this.listOfDisplayData = $event;
        this.refreshStatus();
    }

    refreshStatus(): void {
        this.isAllDisplayDataChecked = this.listOfDisplayData.every(item => this.mapOfCheckedId[item.id]);
        this.isIndeterminate = this.listOfDisplayData.some(item => this.mapOfCheckedId[item.id]) && !this.isAllDisplayDataChecked;
    }

    checkAll(value: boolean): void {
        this.listOfDisplayData.forEach(item => (this.mapOfCheckedId[item.id] = value));
        this.refreshStatus();
    }

    constructor(private nzDrawerService: NzDrawerService,
                private httpService: HttpService) {
    }

    ngOnInit() {
        for (let i = 0; i < 100; i++) {
            this.listOfAllData.push({
                id: i,
                name: `Edward King ${i}`,
                age: 32,
                address: `London, Park Lane no. ${i}`
            });
        }
        this.treeInit();
    }

    // 得到树节点
    treeInit() {
        this.httpService.myPost((MOCK + API.INIT_DEPT_TREE)).subscribe(res => {
                console.log(res);
                res['expanded'] = true;
                this.nodes.push(res);
            }
        );
    }

    // 树节点点击
    treeClick(event: NzFormatEmitEvent) {
        console.log(event);
        this.currentNode = event['node'];
    }

    userAddShow() {
        this.userAddDrawer = this.nzDrawerService.create({
            nzTitle: '增加用户',
            nzContent: UserAddComponent,
            nzMaskClosable: false,
            nzWidth: 520
        });
    }

    userEditShow() {
        this.userEditDrawer = this.nzDrawerService.create({
            nzTitle: '修改用户',
            nzContent: UserEditComponent,
            nzMaskClosable: false,
            nzWidth: 520
        });
    }

}
