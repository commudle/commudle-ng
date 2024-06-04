/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PublicHackathonCustomQuestionsFormComponent } from './public-hackathon-custom-questions-form.component';

describe('PublicHackathonCustomQuestionsFormComponent', () => {
  let component: PublicHackathonCustomQuestionsFormComponent;
  let fixture: ComponentFixture<PublicHackathonCustomQuestionsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PublicHackathonCustomQuestionsFormComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicHackathonCustomQuestionsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
