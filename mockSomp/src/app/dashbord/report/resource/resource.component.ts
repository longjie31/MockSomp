import {Component, OnInit} from '@angular/core';
import {HttpService} from '../../../@auth/services/http.service';
import {EchartsService} from '../../../services/echarts.service';

@Component({
    selector: 'app-resource',
    templateUrl: './resource.component.html',
    styleUrls: ['./resource.component.css']
})
export class ResourceComponent implements OnInit {
    cHeight = 0;
    _search = {
        beginTime: moment().subtract(1, 'M').format(FMT.NYMD),
        endTime: moment().format(FMT.NYMD)
    };
    subTitle = '';

    constructor(private httpService: HttpService, private echartsService: EchartsService) {
    }

    ngOnInit() {
        this.cHeight = document.getElementsByTagName('nz-content')[0]['offsetHeight'] - 16;
        this.subTitle = `${this._search.beginTime}--${this._search.endTime}`;
        setTimeout(() => {
            this.echart0();
        }, 300);
    }

    // 主机在线率统计
    echart0() {
        this.httpService.myPost((MOCK + API.REPORT_RES_HOST), this._search).subscribe(res => {
            if (res !== -1) {
                const data = res.data;
                // data数组的resnum总和
                const totalData = _.sum(_.zipWith(data, d => d.resnum));
                const title = `${res.title}--(${totalData})`;
                // 内圈饼图数据
                const pie1Data = _.zipWith(data, d => {
                    return {name: d.dic_name, value: d.resnum};
                });
                // 外圈饼图数据
                const pie2Data = _.concat(..._.zipWith(data, _.range(data.length), (d, i) => {
                    return [
                        {
                            name: '在线' + d.onlinerate,
                            value: d.onlinenum,
                            itemStyle: {
                                color: ECONF.colors[i]
                            }
                        },
                        {
                            name: '离线' + (100 - parseInt(d.onlinerate, 10)).toFixed(2).replace('.00', '') + '%',
                            value: d.resnum - d.onlinenum,
                            itemStyle: {
                                color: ECONF.colors[21]
                            }
                        }
                    ];
                }));
                /*const pie3Data = [];
                data.forEach((val, index) => {
                    pie3Data.push({
                        name: '在线' + val.onlinerate,
                        value: val.onlinenum,
                        itemStyle: {
                            color: ECONF.colors[index]
                        }
                    });
                    pie3Data.push({
                        name: '离线' + (100 - parseInt(val.onlinerate, 10)).toFixed(2).replace('.00', '') + '%',
                        value: val.resnum - val.onlinenum,
                        itemStyle: {
                            color: ECONF.colors[21]
                        }
                    });
                });*/
                // 改进版
                const pie3Data = _.concat(..._.zipWith(data, _.range(data.length), (val, i) => {// 这里的i就是前面的data.length生成从0开始的数组成员
                        return [
                            {
                                name: '在线' + val.onlinerate,
                                value: val.onlinenum,
                                itemStyle: {
                                    color: ECONF.colors[i]
                                }
                            },
                            {
                                name: '离线' + (100 - parseInt(val.onlinerate, 10)).toFixed(2).replace('.00', '') + '%',
                                value: val.resnum - val.onlinenum,
                                itemStyle: {
                                    color: ECONF.colors[21]
                                }
                            }
                        ];
                    }));
                const width = document.getElementById('res-chart0')['offsetWidth'];
                const height = document.getElementById('res-chart0')['offsetHeight'];
                const radius = _.min([width, height]) / 2;
                const radius1 = [0, radius * .5];
                const radius2 = [radius * .6, radius * .8];
                const center = [width / 2, height / 2];
                const option = {
                    title: {
                        text: title,
                        top: 10,
                        left: 'center'
                    },
                    tooltip: {},
                    series: [
                        {
                            type: 'pie',
                            radius: radius1,
                            center: center,
                            label: {
                                position: 'inner'
                            },
                            data: pie1Data
                        },
                        {
                            type: 'pie',
                            radius: radius2,
                            center: center,
                            label: {
                                position: 'inner'
                            },
                            data: pie3Data
                        }
                    ]
                };
                this.echartsService.render(data, option, 'res-chart0');
            }
        });
    }
}
