/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HackathonMediumCardComponent } from './hackathon-medium-card.component';

describe('HackathonMediumCardComponent', () => {
  let component: HackathonMediumCardComponent;
  let fixture: ComponentFixture<HackathonMediumCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HackathonMediumCardComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HackathonMediumCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
