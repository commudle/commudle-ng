/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HackathonStatusFilterGeneralEmailsComponent } from './hackathon-status-filter-general-emails.component';

describe('HackathonStatusFilterGeneralEmailsComponent', () => {
  let component: HackathonStatusFilterGeneralEmailsComponent;
  let fixture: ComponentFixture<HackathonStatusFilterGeneralEmailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HackathonStatusFilterGeneralEmailsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HackathonStatusFilterGeneralEmailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
