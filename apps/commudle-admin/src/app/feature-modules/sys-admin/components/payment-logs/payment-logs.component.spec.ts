/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PaymentLogsComponent } from './payment-logs.component';

describe('PaymentLogsComponent', () => {
  let component: PaymentLogsComponent;
  let fixture: ComponentFixture<PaymentLogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentLogsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
