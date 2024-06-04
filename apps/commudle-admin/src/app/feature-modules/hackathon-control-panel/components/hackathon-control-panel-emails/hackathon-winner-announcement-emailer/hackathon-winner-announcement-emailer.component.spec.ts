/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HackathonWinnerAnnouncementEmailerComponent } from './hackathon-winner-announcement-emailer.component';

describe('HackathonWinnerAnnouncementEmailerComponent', () => {
  let component: HackathonWinnerAnnouncementEmailerComponent;
  let fixture: ComponentFixture<HackathonWinnerAnnouncementEmailerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HackathonWinnerAnnouncementEmailerComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HackathonWinnerAnnouncementEmailerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
