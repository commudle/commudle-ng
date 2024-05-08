/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HackathonControlPanelRegistrationsComponent } from './hackathon-control-panel-registrations.component';

describe('HackathonControlPanelRegistrationsComponent', () => {
  let component: HackathonControlPanelRegistrationsComponent;
  let fixture: ComponentFixture<HackathonControlPanelRegistrationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HackathonControlPanelRegistrationsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HackathonControlPanelRegistrationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
