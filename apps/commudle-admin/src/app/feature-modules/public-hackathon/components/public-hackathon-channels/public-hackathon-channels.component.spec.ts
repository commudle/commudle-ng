/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PublicHackathonChannelsComponent } from './public-hackathon-channels.component';

describe('PublicHackathonChannelsComponent', () => {
  let component: PublicHackathonChannelsComponent;
  let fixture: ComponentFixture<PublicHackathonChannelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PublicHackathonChannelsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicHackathonChannelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
