/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HackathonControlPanelSponsorCardComponent } from './hackathon-control-panel-sponsor-card.component';

describe('HackathonControlPanelSponsorCardComponent', () => {
  let component: HackathonControlPanelSponsorCardComponent;
  let fixture: ComponentFixture<HackathonControlPanelSponsorCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HackathonControlPanelSponsorCardComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HackathonControlPanelSponsorCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
