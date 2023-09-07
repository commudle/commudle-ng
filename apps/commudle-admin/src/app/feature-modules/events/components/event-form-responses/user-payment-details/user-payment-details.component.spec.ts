import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPaymentDetailsComponent } from './user-payment-details.component';

describe('UserPaymentDetailsComponent', () => {
  let component: UserPaymentDetailsComponent;
  let fixture: ComponentFixture<UserPaymentDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserPaymentDetailsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UserPaymentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
