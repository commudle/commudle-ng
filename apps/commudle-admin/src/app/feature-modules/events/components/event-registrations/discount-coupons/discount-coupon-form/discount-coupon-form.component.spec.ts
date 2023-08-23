import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountCouponFormComponent } from './discount-coupon-form.component';

describe('DiscountCouponFormComponent', () => {
  let component: DiscountCouponFormComponent;
  let fixture: ComponentFixture<DiscountCouponFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DiscountCouponFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DiscountCouponFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
