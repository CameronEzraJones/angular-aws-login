import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user-service/user-service.service';
declare var $: any;

@Component({
  selector: 'app-auth-confirm-user',
  templateUrl: './auth-confirm-user.component.html',
  styleUrls: ['./auth-confirm-user.component.css']
})
export class AuthConfirmUserComponent implements OnInit {
  confirmForm: FormGroup;
  confCode: AbstractControl;
  error: string;

  constructor(private userService: UserService, fb: FormBuilder) {
    this.confirmForm = fb.group({
      confCode: ['', Validators.required]
    });

    this.confCode = this.confirmForm.controls['confCode'];
  }

  onSubmit() {
    this.userService.confirmSignup(this.confCode.value).then((response) => {
      $('#authForm').foundation('close');
    }).catch((reason) => {
      this.error = reason.message;
    });
  }

  ngOnInit() {
  }

}
