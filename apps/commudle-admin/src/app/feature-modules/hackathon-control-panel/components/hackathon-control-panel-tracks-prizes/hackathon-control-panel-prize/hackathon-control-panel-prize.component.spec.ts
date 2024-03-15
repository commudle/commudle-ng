/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HackathonControlPanelPrizeComponent } from './hackathon-control-panel-prize.component';

describe('HackathonControlPanelPrizeComponent', () => {
  let component: HackathonControlPanelPrizeComponent;
  let fixture: ComponentFixture<HackathonControlPanelPrizeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HackathonControlPanelPrizeComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HackathonControlPanelPrizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
