/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HackathonLargeCardComponent } from './hackathon-large-card.component';

describe('HackathonLargeCardComponent', () => {
  let component: HackathonLargeCardComponent;
  let fixture: ComponentFixture<HackathonLargeCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HackathonLargeCardComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HackathonLargeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
