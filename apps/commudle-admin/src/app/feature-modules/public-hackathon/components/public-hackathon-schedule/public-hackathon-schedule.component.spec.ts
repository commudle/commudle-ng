/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PublicHackathonScheduleComponent } from './public-hackathon-schedule.component';

describe('PublicHackathonScheduleComponent', () => {
  let component: PublicHackathonScheduleComponent;
  let fixture: ComponentFixture<PublicHackathonScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PublicHackathonScheduleComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicHackathonScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
