/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { JobsListCardComponent } from './jobs-list-card.component';

describe('JobsListCardComponent', () => {
  let component: JobsListCardComponent;
  let fixture: ComponentFixture<JobsListCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [JobsListCardComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobsListCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
