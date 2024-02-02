/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PublicHackathonTeammateProjectDetailsFormComponent } from './public-hackathon-teammate-project-details-form.component';

describe('PublicHackathonTeammateProjectDetailsFormComponent', () => {
  let component: PublicHackathonTeammateProjectDetailsFormComponent;
  let fixture: ComponentFixture<PublicHackathonTeammateProjectDetailsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PublicHackathonTeammateProjectDetailsFormComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicHackathonTeammateProjectDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
