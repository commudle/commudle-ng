/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { OrgChannelsComponent } from './org-channels.component';

describe('OrgChannelsComponent', () => {
  let component: OrgChannelsComponent;
  let fixture: ComponentFixture<OrgChannelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OrgChannelsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgChannelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
