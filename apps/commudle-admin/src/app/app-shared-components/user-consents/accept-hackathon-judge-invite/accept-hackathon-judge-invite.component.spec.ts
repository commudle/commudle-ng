/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AcceptHackathonJudgeInviteComponent } from './accept-hackathon-judge-invite.component';

describe('AcceptHackathonJudgeInviteComponent', () => {
  let component: AcceptHackathonJudgeInviteComponent;
  let fixture: ComponentFixture<AcceptHackathonJudgeInviteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AcceptHackathonJudgeInviteComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptHackathonJudgeInviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
