/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PublicCommunityHackathonsComponent } from './public-community-hackathons.component';

describe('PublicCommunityHackathonsComponent', () => {
  let component: PublicCommunityHackathonsComponent;
  let fixture: ComponentFixture<PublicCommunityHackathonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PublicCommunityHackathonsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicCommunityHackathonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
