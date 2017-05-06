import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthConfirmUserComponent } from './auth-confirm-user.component';

describe('AuthConfirmUserComponent', () => {
  let component: AuthConfirmUserComponent;
  let fixture: ComponentFixture<AuthConfirmUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthConfirmUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthConfirmUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
