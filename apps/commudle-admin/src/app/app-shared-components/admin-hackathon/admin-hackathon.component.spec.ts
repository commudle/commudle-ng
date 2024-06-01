/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AdminHackathonComponent } from './admin-hackathon.component';

describe('AdminHackathonComponent', () => {
  let component: AdminHackathonComponent;
  let fixture: ComponentFixture<AdminHackathonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminHackathonComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminHackathonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
