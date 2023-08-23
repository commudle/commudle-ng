import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountCouponsComponent } from './discount-coupons.component';

describe('DiscountCouponsComponent', () => {
  let component: DiscountCouponsComponent;
  let fixture: ComponentFixture<DiscountCouponsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DiscountCouponsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DiscountCouponsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
