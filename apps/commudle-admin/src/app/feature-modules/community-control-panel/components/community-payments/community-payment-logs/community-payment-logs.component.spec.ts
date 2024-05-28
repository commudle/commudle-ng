/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CommunityPaymentLogsComponent } from './community-payment-logs.component';

describe('CommunityPaymentLogsComponent', () => {
  let component: CommunityPaymentLogsComponent;
  let fixture: ComponentFixture<CommunityPaymentLogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CommunityPaymentLogsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityPaymentLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
