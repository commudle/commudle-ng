/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AcceptHackathonTeammateInviteComponent } from './accept-hackathon-teammate-invite.component';

describe('AcceptHackathonTeammateInviteComponent', () => {
  let component: AcceptHackathonTeammateInviteComponent;
  let fixture: ComponentFixture<AcceptHackathonTeammateInviteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AcceptHackathonTeammateInviteComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptHackathonTeammateInviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
