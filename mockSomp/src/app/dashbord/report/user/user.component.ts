import {Component, OnInit} from '@angular/core';

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

    constructor() {
        console.log(this._search);
    }

    ngOnInit() {
    }

}
