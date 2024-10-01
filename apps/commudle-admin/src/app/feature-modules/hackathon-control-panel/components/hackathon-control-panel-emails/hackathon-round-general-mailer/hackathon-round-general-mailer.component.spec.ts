/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HackathonRoundGeneralMailerComponent } from './hackathon-round-general-mailer.component';

describe('HackathonRoundGeneralMailerComponent', () => {
  let component: HackathonRoundGeneralMailerComponent;
  let fixture: ComponentFixture<HackathonRoundGeneralMailerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HackathonRoundGeneralMailerComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HackathonRoundGeneralMailerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
