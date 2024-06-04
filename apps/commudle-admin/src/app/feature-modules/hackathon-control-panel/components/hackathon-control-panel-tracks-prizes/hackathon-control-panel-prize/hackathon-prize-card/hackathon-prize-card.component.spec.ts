/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HackathonPrizeCardComponent } from './hackathon-prize-card.component';

describe('HackathonPrizeCardComponent', () => {
  let component: HackathonPrizeCardComponent;
  let fixture: ComponentFixture<HackathonPrizeCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HackathonPrizeCardComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HackathonPrizeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
