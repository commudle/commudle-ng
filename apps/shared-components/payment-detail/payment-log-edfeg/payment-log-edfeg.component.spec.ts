/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PaymentLogEdfegComponent } from './payment-log-edfeg.component';

describe('PaymentLogEdfegComponent', () => {
  let component: PaymentLogEdfegComponent;
  let fixture: ComponentFixture<PaymentLogEdfegComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentLogEdfegComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentLogEdfegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
