import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-plan-add',
    templateUrl: './plan-add.component.html',
    styleUrls: ['./plan-add.component.css']
})
export class PlanAddComponent implements OnInit {
    addForm: FormGroup;
    startTime: any;
    endTime: any;

    constructor(private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.createForm();
        debugger;
        this.startTime = moment().format(FMT.NDT);
        this.endTime = moment().add(1, 'y').format(FMT.NDT);
        console.log(this.startTime);
        console.log(this.endTime);
    }

    createForm() {
        this.addForm = this.formBuilder.group({
            name: [null, [Validators.required, Validators.pattern(REG.LN), Validators.maxLength(20)]],
            time: [this.startTime, this.endTime]
        });
    }
}
