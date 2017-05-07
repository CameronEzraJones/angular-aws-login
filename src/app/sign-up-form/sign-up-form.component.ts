import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user-service/user-service.service';
declare const $: any;

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.css']
})
export class SignUpFormComponent implements OnInit {
  signUpForm: FormGroup;
  name: AbstractControl;
  username: AbstractControl;
  email: AbstractControl;
  password: AbstractControl;
  passwordCheck: AbstractControl;
  error: Error;

  constructor(private userService: UserService, fb: FormBuilder) {
    const self = this;
    this.signUpForm = fb.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, passwordValidator])],
      passwordCheck: ['', Validators.compose([Validators.required, matchingPasswordsValidator])]
    });

    this.username = this.signUpForm.controls['username'];
    this.password = this.signUpForm.controls['password'];
    this.name = this.signUpForm.controls['name'];
    this.email = this.signUpForm.controls['email'];
    this.passwordCheck = this.signUpForm.controls['passwordCheck'];

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
      if (self.password && self.password.value !== control.value) {
        return {mismatchedPasswords: true};
      }
    }
  }

  onSubmit() {
    this.userService.signup(this.name.value, this.email.value, this.username.value, this.password.value)
      .catch((err) => {
        this.error = err;
      });
  };

  ngOnInit() {
  }

}
