import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user-service/user-service.service';
declare const $: any;

@Component({
  selector: 'app-log-in-form',
  templateUrl: './log-in-form.component.html',
  styleUrls: ['./log-in-form.component.css']
})
export class LogInFormComponent implements OnInit {
  logInForm: FormGroup;
  username: AbstractControl;
  password: AbstractControl;
  error: Error;

  constructor(private userService: UserService, fb: FormBuilder) {
    const self = this;
    this.logInForm = fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.username = this.logInForm.controls['username'];
    this.password = this.logInForm.controls['password'];
  }

  onSubmit() {
    this.userService.login(this.username.value, this.password.value).then((result) => {
      $('#authForm').foundation('close');
      console.log(result);
    }).catch((err) => {
      this.error = err;
    });
  };

  ngOnInit() {
  }

}
