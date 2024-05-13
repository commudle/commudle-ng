/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CommunityBankDetailsComponent } from './community-bank-details.component';

describe('CommunityBankDetailsComponent', () => {
  let component: CommunityBankDetailsComponent;
  let fixture: ComponentFixture<CommunityBankDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CommunityBankDetailsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityBankDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
