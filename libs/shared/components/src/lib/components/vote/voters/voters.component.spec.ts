/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { VotersComponent } from './voters.component';

describe('VotersComponent', () => {
  let component: VotersComponent;
  let fixture: ComponentFixture<VotersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VotersComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
