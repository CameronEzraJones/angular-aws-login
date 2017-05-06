import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../user-service/user-service.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
declare var $: any;

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.css']
})
export class AuthFormComponent implements OnInit {
  @Input() mode: string;
  loginForm: FormGroup;
  name: AbstractControl;
  username: AbstractControl;
  email: AbstractControl;
  password: AbstractControl;
  passwordCheck: AbstractControl;
  error: Error;

  constructor(private userService: UserService, fb: FormBuilder) {
    const self = this;
    this.loginForm = fb.group({
      name: [''],
      username: ['', Validators.required],
      email: [''],
      password: ['', Validators.compose([signUpRequiredValidator, passwordValidator])],
      passwordCheck: ['']
    });

    if (self.mode === 'sign up') {
      this.loginForm.addControl('name', new FormControl('', Validators.required));
      this.loginForm.addControl('email', new FormControl('', Validators.compose([Validators.required, Validators.email])));
      this.loginForm.addControl('passwordCheck',
        new FormControl('', Validators.compose([Validators.required, matchingPasswordsValidator])));
    }

    this.username = this.loginForm.controls['username'];
    this.password = this.loginForm.controls['password'];
    this.name = this.loginForm.controls['name'];
    this.email = this.loginForm.controls['email'];
    this.passwordCheck = this.loginForm.controls['passwordCheck'];

    function signUpRequiredValidator(control: FormControl): { [s: string]: boolean } {
      if (control.value.length <= 0 && self.mode === 'sign up') {
        return {signUpRequired: true};
      }
    }

    function passwordValidator(control: FormControl): { [s: string]: boolean } {
      // minimum length: 8
      if (control.value.length < 8) {
        return {passwordTooShort: true};
      }
      // must have number
      if (!control.value.match(/[1-9]/g)) {
        return {passwordNoNumber: true};
      }
      // must have lowercase letter
      if (!control.value.match(/[a-z]/g)) {
        return {passwordNoLowercase: true};
      }
      // must have uppercase letter
      if (!control.value.match(/[A-Z]/g)) {
        return {passwordNoUppercase: true};
      }
      // must have special character
      if (!control.value.match(/[\^\$\*\.\[\]\{\}\(\)\?\-\"\!\@\#\%\&\/\,\>\<\'\:\;\|\_\~\`]/g)) {
        return {passwordNoSpecial: true};
      }
    }

    function matchingPasswordsValidator(control: FormControl): { [s: string]: boolean } {
      if (self.mode === 'sign up' && self.password && self.password.value !== control.value) {
        return {mismatchedPasswords: true};
      }
    }
  }

  onSubmit() {
    // if (this.signUpMode) {
    //   this.UserService.signup(null, null);
    // }
    console.log('Submit button hit');
    if (this.mode === 'log in') {
      this.userService.login(this.username.value, this.password.value).then((result) => {
        $('#authForm').foundation('close');
        console.log(result);
      }).catch((err) => {
        console.error(err);
      });
    } else if (this.mode === 'sign up') {
      this.userService.signup(this.name.value, this.email.value, this.username.value, this.password.value)
        .catch((err) => {
          this.error = err;
        });
    }
  };

  ngOnInit() {
  }

}
