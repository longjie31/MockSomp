import {Component, OnInit} from '@angular/core';
import {HttpService} from '../../@auth/services/http.service';

@Component({
    selector: 'app-monitor',
    templateUrl: './monitor.component.html',
    styleUrls: ['./monitor.component.less']
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
    diskArray = [];
    ethArray = [];
    // 表格
    infoArray = [];
    tabLoading = false;
    total = 0;
    page = 1;
    limit = 4;

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
            if (res !== -1) {
                this.hostData = res;
                this.currentHost = this.hostData[0];
                this.searchMoreInfo(this.currentHost['deviceFlag']);
            }
        });
    }

    // 查询详细信息
    searchMoreInfo(deviceFlag) {
        this.tabLoading = true;
        this.httpService.myPost((MOCK + API.MONITOR_MORE_INFO), {deviceFlag}).subscribe(res => {
            this.tabLoading = false;
            if (res !== -1) {
                this.currentMoreInfo = res[0];
                this.diskArray = this.currentMoreInfo['disk'];
                this.ethArray = this.currentMoreInfo['listEth'];
                this.diskArray.forEach(val => {
                    val.percent = ((parseFloat(_.trimEnd(val.deviceDiskAll, 'GB')) - parseFloat(_.trimEnd(val.deviceDiskFree, 'GB')))
                        / parseFloat(_.trimEnd(val.deviceDiskAll, 'GB')) * 100).toFixed(0);
                });
                this.infoArray = this.currentMoreInfo['listApp'];
                this.total = this.infoArray.length;
            }
        });
    }
}
