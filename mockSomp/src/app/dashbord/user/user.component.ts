import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
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
        this.isIndeterminate =
            this.listOfDisplayData.some(item => this.mapOfCheckedId[item.id]) && !this.isAllDisplayDataChecked;
    }

    checkAll(value: boolean): void {
        this.listOfDisplayData.forEach(item => (this.mapOfCheckedId[item.id] = value));
        this.refreshStatus();
    }

    constructor() {
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
    }

}
