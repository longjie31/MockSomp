import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class EchartsService {

  constructor() { }

    /**
     * @method 图表渲染
     * @param data 数据
     * @param option 图表选项
     * @param chartId 图表ID
     * @param exTable 是否导出Table
     */
    render(data, option, chartId, exTable?) {
        this[chartId] ? this[chartId].dispose() : this[chartId] = null;
        this[chartId] = echarts.init(document.getElementById(chartId), ECONF.theme);
        this[chartId].setOption(option);
    }

}
