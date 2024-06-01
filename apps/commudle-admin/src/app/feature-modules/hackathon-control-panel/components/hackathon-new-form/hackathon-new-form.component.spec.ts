/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HackathonNewFormComponent } from './hackathon-new-form.component';

describe('HackathonNewFormComponent', () => {
  let component: HackathonNewFormComponent;
  let fixture: ComponentFixture<HackathonNewFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HackathonNewFormComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HackathonNewFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
