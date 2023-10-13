import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentSettingsComponent } from './payment-settings.component';

describe('PaymentSettingsComponent', () => {
  let component: PaymentSettingsComponent;
  let fixture: ComponentFixture<PaymentSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaymentSettingsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PaymentSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
