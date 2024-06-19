/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HackathonControlPanelTracksPrizesComponent } from './hackathon-control-panel-tracks-prizes.component';

describe('HackathonControlPanelTracksPrizesComponent', () => {
  let component: HackathonControlPanelTracksPrizesComponent;
  let fixture: ComponentFixture<HackathonControlPanelTracksPrizesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HackathonControlPanelTracksPrizesComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HackathonControlPanelTracksPrizesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
