import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UserRoleConfirmationComponent } from './user-role-confirmation.component';

describe('UserRoleConfirmationComponent', () => {
  let component: UserRoleConfirmationComponent;
  let fixture: ComponentFixture<UserRoleConfirmationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UserRoleConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRoleConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
