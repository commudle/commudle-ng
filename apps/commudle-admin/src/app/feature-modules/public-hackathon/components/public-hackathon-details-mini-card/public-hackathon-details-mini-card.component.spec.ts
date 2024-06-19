/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PublicHackathonDetailsMiniCardComponent } from './public-hackathon-details-mini-card.component';

describe('PublicHackathonDetailsMiniCardComponent', () => {
  let component: PublicHackathonDetailsMiniCardComponent;
  let fixture: ComponentFixture<PublicHackathonDetailsMiniCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PublicHackathonDetailsMiniCardComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicHackathonDetailsMiniCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
