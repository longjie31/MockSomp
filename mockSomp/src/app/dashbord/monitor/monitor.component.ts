import {Component, OnInit} from '@angular/core';
import {HttpService} from '../../@auth/services/http.service';

@Component({
    selector: 'app-monitor',
    templateUrl: './monitor.component.html',
    styleUrls: ['./monitor.component.css']
})
export class MonitorComponent implements OnInit {
    hostData = [];
    listLoading = false;
    gridStyle = {
        width: '25%',
        textAlign: 'center',
        padding: '10px'
    };
    gridStyle1 = {
        width: '33.3%',
        textAlign: 'center',
        padding: '10px'
    };
    currentHost = {};
    currentMoreInfo = {};

    constructor(private httpService: HttpService) {
    }

    ngOnInit() {
        this.searchList();
    }

    // 查询监控中心列表
    searchList() {
        this.listLoading = true;
        this.httpService.myPost((MOCK + API.MONITOR_LIST)).subscribe(res => {
            this.listLoading = false;
            console.log(res);
            if (res !== -1) {
                this.hostData = res;
                this.currentHost = this.hostData[0];
                this.searchMoreInfo(this.currentHost['deviceFlag']);
            }
        });
    }

    // 查询详细信息
    searchMoreInfo(deviceFlag) {
        this.httpService.myPost((MOCK + API.MONITOR_MORE_INFO), {deviceFlag}).subscribe(res => {
            console.log(res);
            if (res !== -1) {
                this.currentMoreInfo = res[0];
            }
        });
    }
}
