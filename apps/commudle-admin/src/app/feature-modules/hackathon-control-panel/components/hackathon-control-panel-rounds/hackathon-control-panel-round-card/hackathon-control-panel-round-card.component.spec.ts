/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HackathonControlPanelRoundCardComponent } from './hackathon-control-panel-round-card.component';

describe('HackathonControlPanelRoundCardComponent', () => {
  let component: HackathonControlPanelRoundCardComponent;
  let fixture: ComponentFixture<HackathonControlPanelRoundCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HackathonControlPanelRoundCardComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HackathonControlPanelRoundCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
