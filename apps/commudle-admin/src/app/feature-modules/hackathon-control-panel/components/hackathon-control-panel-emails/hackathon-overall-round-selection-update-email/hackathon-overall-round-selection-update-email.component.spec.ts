/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HackathonOverallRoundSelectionUpdateEmailComponent } from './hackathon-overall-round-selection-update-email.component';

describe('HackathonOverallRoundSelectionUpdateEmailComponent', () => {
  let component: HackathonOverallRoundSelectionUpdateEmailComponent;
  let fixture: ComponentFixture<HackathonOverallRoundSelectionUpdateEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HackathonOverallRoundSelectionUpdateEmailComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HackathonOverallRoundSelectionUpdateEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
