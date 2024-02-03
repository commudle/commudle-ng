/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PublicHackathonProjectDetailsFormComponent } from './public-hackathon-project-details-form.component';

describe('PublicHackathonTeammateProjectDetailsFormComponent', () => {
  let component: PublicHackathonProjectDetailsFormComponent;
  let fixture: ComponentFixture<PublicHackathonProjectDetailsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PublicHackathonProjectDetailsFormComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicHackathonProjectDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
