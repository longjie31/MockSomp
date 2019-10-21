import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.less']
})
export class SignupComponent implements OnInit {
    signup: FormGroup;
    // 确认密码验证
    confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
        if (!control.value) {
            return {required: true};
        } else if (control.value !== this.signup.controls.password.value) {
            return {confirm: true, error: true};
        }
    };

    constructor(private formBuilder: FormBuilder,
                private router: Router) {
    }

    ngOnInit() {
        this.createForm();
    }

    createForm() {
        this.signup = this.formBuilder.group({
            uid: [null, [Validators.required]],
            password: [null, [Validators.required]],
            password_: [null, [Validators.required, this.confirmationValidator]]
        });
    }

    signupFun() {
        this.router.navigate(['/auth/login']).then();
    }

    // 更新确认密码状态
    updateConfirmValidator(): void {
        Promise.resolve()
               .then(() => this.signup.controls.password_.updateValueAndValidity());
    }
}
