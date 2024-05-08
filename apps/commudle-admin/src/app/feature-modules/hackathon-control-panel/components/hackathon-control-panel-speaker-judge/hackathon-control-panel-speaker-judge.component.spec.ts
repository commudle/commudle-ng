/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HackathonControlPanelSpeakerJudgeComponent } from './hackathon-control-panel-speaker-judge.component';

describe('HackathonControlPanelSpeakerJudgeComponent', () => {
  let component: HackathonControlPanelSpeakerJudgeComponent;
  let fixture: ComponentFixture<HackathonControlPanelSpeakerJudgeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HackathonControlPanelSpeakerJudgeComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HackathonControlPanelSpeakerJudgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
