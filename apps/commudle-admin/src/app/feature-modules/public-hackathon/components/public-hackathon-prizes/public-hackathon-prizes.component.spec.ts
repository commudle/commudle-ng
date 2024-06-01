/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PublicHackathonPrizesComponent } from './public-hackathon-prizes.component';

describe('PublicHackathonPrizesComponent', () => {
  let component: PublicHackathonPrizesComponent;
  let fixture: ComponentFixture<PublicHackathonPrizesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PublicHackathonPrizesComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicHackathonPrizesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
