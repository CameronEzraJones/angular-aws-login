import { Component } from '@angular/core';
import { UserService } from './user-service/user-service.service';
import { UserAuthState } from './user-service/user-auth-state.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular Kanban';
  authFormMode = '';

  constructor(private userService: UserService) {};
}
