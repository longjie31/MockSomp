import {Component, OnInit} from '@angular/core';
import {HttpService} from '../../../@auth/services/http.service';
import {EchartsService} from '../../../services/echarts.service';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
    _search = {
        beginTime: moment().subtract(1, 'M').format(FMT.NYMD),
        endTime: moment().format(FMT.NYMD)
    };
    // 页面高度
    cHeight = 0;
    // 副标题
    subTitle = '';

    constructor(private httpService: HttpService, private echartsService: EchartsService) {
    }

    ngOnInit() {
        this.cHeight = document.getElementsByTagName('nz-content')[0]['offsetHeight'] - 16;
        this.subTitle = `${this._search.beginTime}--${this._search.endTime}`;
        setTimeout(() => {
            this.echart0();
            this.echart1();
            this.echart2();
            this.echart3();
            this.echart4();
        }, 300);

    }

    // 渲染用户访问统计表
    echart0() {
        this.httpService.myPost((MOCK + API.REPORT_USER_LOGIN_DATE), this._search).subscribe(res => {
            if (res !== -1) {
                const data = res.data;
                // 获取标题
                const title = res.title;
                // 获取x轴数据，把返回的日期转换为MM-DD的格式
                const xData = _.zipWith(data, d => moment(d.date).format(FMT.NMD));
                // 获取y轴数据,挑出返回的数据里的lognums
                const sData = _.zipWith(data, d => d.lognums);
                // 这句看看
                // 获取sData的最大值转为字符串，长度乘以7+17（没看懂为啥这样做,应该是算出来的）
                const left = _.max(sData).toString().length * 7 + 17;
                // echarts配置
                const option = {
                    title: {// 设置标题
                        text: title, // 主标题
                        subtext: this.subTitle, // 副标题
                        top: 10, // 离容器上侧的距离
                        left: 'center'// 离容器左侧的距离
                    },
                    grid: {// 直角坐标系内绘图网格
                        bottom: 45, // 离容器下侧的距离
                        left: left, // 容器左侧的距离（刚才的left设置的是离左侧的距离）
                        right: 0// 离容器右侧的距离
                    },
                    tooltip: {// 提示框组件
                        trigger: 'axis', // 触发类型，axis：坐标轴触发
                        axisPointer: {// 坐标轴指示器配置项
                            type: 'shadow', // 指示器类型，shadow：阴影指示器
                        }
                    },
                    xAxis: {// x 轴设置
                        axisLabel: {// 坐标轴刻度标签的相关设置
                            rotate: 45// 刻度标签旋转的角度，在类目轴的类目标签显示不下的时候可以通过旋转防止标签之间重叠。
                        },
                        data: xData // x轴数据
                    },
                    yAxis: { // y 轴
                        type: 'value'// value' 数值轴，适用于连续数据。（默认值，可以省略）
                    },
                    series: [
                        {// 系列列表，系列通过 type 决定自己的图表类型
                            type: 'line', // 类型为折线图
                            symbolSize: 10, // 标记的大小，可以设置成诸如 10 这样单一的数字
                            data: sData// 数据内容数组
                        }
                    ]
                };
                // 调用服务的渲染
                this.echartsService.render(data, option, 'user-chart0');
            }
        });
    }

    // 渲染外部用户接入统计
    echart1() {
        this.httpService.myPost((MOCK + API.REPORT_USER_DEPARTMENT)).subscribe(res => {
            if (res !== -1) {
                const data = res.data;
                // 求num的总和
                const totalData = _.sum(_.zipWith(data, d => d.num));
                // 标题
                const title = `${res.title}(${totalData})`;
                // 部门名称集合
                const lData = _.zipWith(data, d => d.deptname);
                //  饼状数据
                const sData = _.zipWith(data, d => {
                    return {name: d.deptname, value: d.num};
                });
                const radius = [0, this.cHeight * 0.15 - 30];
                const center = [this.cHeight * 0.15 - 10, this.cHeight * 0.15 + 10];
                const option = {
                    title: [
                        {
                            text: title,
                            top: 10,
                            left: 'center'
                        }
                    ],
                    grid: {
                        top: 60,
                        bottom: 50,
                        left: 30,
                        right: 0
                    },
                    legend: { // 图例组件
                        type: 'scroll', // 滚动翻页的图例。当图例数量较多时可以使用
                        orient: 'vertical', // 图例列表垂直展示
                        right: 20,
                        top: 40,
                        bottom: 20,
                        data: lData// 刚才的部门名称集合
                    },
                    tooltip: {},
                    series: [
                        {
                            name: '人数', // 系列名称
                            type: 'pie', // 饼图
                            radius: radius, // 饼图半径
                            center: center, // 饼图中心坐标
                            label: {// 饼图图形上的文本标签
                                position: 'inside', // 标签位置：饼图扇区内部
                                formatter: '{c} ({d}%)'// c数据值，d百分比
                            },
                            data: sData // 数据
                        }
                    ]
                };
                this.echartsService.render(data, option, 'user-chart1');
            }
        });
    }

    // 渲染用户访问统计
    echart2() {
        this.httpService.myPost((MOCK + API.REPORT_USER_LOGIN), this._search).subscribe(res => {
            if (res !== -1) {
                const data = res.data;
                const title = res.title;
                // 只显示前10个
                const xData = _.zipWith(_.take(data, 10), d => d.uname);
                const sData = _.zipWith(_.take(data, 10), d => d.loginnum);
                const left = _.max(sData).toString().length * 7 + 17;
                const option = {
                    title: {
                        text: title,
                        subtext: this.subTitle,
                        top: 10,
                        left: 'center'
                    },
                    grid: {
                        top: 60,
                        bottom: 30,
                        left: left,
                        right: 0
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow',
                        }
                    },
                    xAxis: {
                        type: 'category',
                        data: xData
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                        {
                            type: 'bar',
                            data: sData
                        }
                    ]
                };
                this.echartsService.render(data, option, 'user-chart2');
            }
        });
    }

    // 渲染非工作时间的用户访问统计
    echart3() {
        this.httpService.myPost((MOCK + API.REPORT_USER_LOGIN_OUT_TIME), this._search).subscribe(res => {
            if (res !== -1) {
                const data = res.data;
                const title = res.title;
                const xData = _.zipWith(_.take(data, 10), d => d.uname);
                const sData = _.zipWith(_.take(data, 10), d => d.loginnum);
                const left = _.max(sData).toString().length * 7 + 17;
                const option = {
                    title: {
                        text: title,
                        subtext: this.subTitle,
                        top: 10,
                        left: 'center'
                    },
                    grid: {
                        top: 60,
                        bottom: 30,
                        left: left,
                        right: 0
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow',
                        }
                    },
                    xAxis: {
                        type: 'category',
                        data: xData
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                        {
                            type: 'bar',
                            data: sData
                        }
                    ]
                };
                this.echartsService.render(data, option, 'user-chart3');
            }
        });
    }

    // 僵尸用户统计
    echart4() {
        this.httpService.myPost((MOCK + API.REPORT_USER_ACTIVE), this._search).subscribe(res => {
            if (res !== -1) {
                const data = res.data;
                const title = res.title;
                const sData = _.zipWith(data, d => {
                    return {
                        name: d.uname,
                        value: [_.random(0, 10000), _.random(0, 10000)], // 0到10000的随机数
                        symbolSize: this.length(d.uname) * 10,
                        itemStyle: {
                            normal: {
                                color: ECONF.colors[_.random(21)]
                            }
                        }
                    };
                });
                const option = {
                    title: {
                        text: title,
                        subtext: this.subTitle,
                        top: 10,
                        left: 'center'
                    },
                    xAxis: [
                        {
                            show: false, // 隐藏x轴，y轴同理
                            min: 0,
                            max: 10000
                        }
                    ],
                    yAxis: [
                        {
                            show: false,
                            min: 0,
                            max: 10000
                        }
                    ],
                    series: [
                        {
                            type: 'scatter',
                            symbol: 'circle', // 圆圈形状，默认值可省略
                            symbolSize: 120,
                            label: {
                                normal: {
                                    show: true,
                                    formatter: '{b}',
                                    fontSize: 16
                                },
                            },
                            data: sData
                        }
                    ]
                };
                this.echartsService.render(data, option, 'user-chart4');
            }
        });
    }

    length(str) {
        let len = 0;
        for (let i = 0, j = str.length; i < j; i++) {
            if (str.charCodeAt(i) > 127 || str.charCodeAt(i) === 94) {
                len += 2;
            } else {
                len++;
            }
        }
        return len;
    }
}
