import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-plan-add',
    templateUrl: './plan-add.component.html',
    styleUrls: ['./plan-add.component.css']
})
export class PlanAddComponent implements OnInit {
    addForm: FormGroup;

    constructor(private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.createForm();
    }

    createForm() {
        this.addForm = this.formBuilder.group({
            uid: [null, [Validators.required, Validators.pattern(REG.LN), Validators.maxLength(20)]]
        });
    }
}
