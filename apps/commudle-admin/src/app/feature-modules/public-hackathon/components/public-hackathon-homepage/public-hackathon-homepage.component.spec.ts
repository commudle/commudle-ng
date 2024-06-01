/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PublicHackathonHomepageComponent } from './public-hackathon-homepage.component';

describe('PublicHackathonHomepageComponent', () => {
  let component: PublicHackathonHomepageComponent;
  let fixture: ComponentFixture<PublicHackathonHomepageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PublicHackathonHomepageComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicHackathonHomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
