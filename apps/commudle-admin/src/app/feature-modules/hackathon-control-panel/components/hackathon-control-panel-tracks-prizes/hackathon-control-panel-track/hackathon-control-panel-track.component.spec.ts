/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HackathonControlPanelTrackComponent } from './hackathon-control-panel-track.component';

describe('HackathonControlPanelTrackComponent', () => {
  let component: HackathonControlPanelTrackComponent;
  let fixture: ComponentFixture<HackathonControlPanelTrackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HackathonControlPanelTrackComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HackathonControlPanelTrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
