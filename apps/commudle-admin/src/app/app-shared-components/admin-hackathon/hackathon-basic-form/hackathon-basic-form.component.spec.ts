/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HackathonBasicFormComponent } from './hackathon-basic-form.component';

describe('HackathonBasicFormComponent', () => {
  let component: HackathonBasicFormComponent;
  let fixture: ComponentFixture<HackathonBasicFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HackathonBasicFormComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HackathonBasicFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
