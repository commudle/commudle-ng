/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HackathonRegistrationConsentComponent } from './hackathon-registration-consent.component';

describe('HackathonRegistrationConsentComponent', () => {
  let component: HackathonRegistrationConsentComponent;
  let fixture: ComponentFixture<HackathonRegistrationConsentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HackathonRegistrationConsentComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HackathonRegistrationConsentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
