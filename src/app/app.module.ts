import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes} from '@angular/router';

import { AppComponent } from './app.component';

import { UserService } from './user-service/user-service.service';

import { AuthFormComponent } from './auth-form/auth-form.component';
import { HomeComponent } from './home/home.component';
import { AuthConfirmUserComponent } from './auth-confirm-user/auth-confirm-user.component';
import { LocalStorageService } from './local-storage/local-storage.service';
import { LoggedInGuard } from './user-service/logged-in.guard';
import { DashboardComponent } from './dashboard/dashboard.component';

const appRoutes: Routes = [
  {path: 'dashboard', component: DashboardComponent, canActivate: [ LoggedInGuard ]},
  {path: 'home', component: HomeComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    AuthFormComponent,
    HomeComponent,
    AuthConfirmUserComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    UserService,
    LocalStorageService,
    LoggedInGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
