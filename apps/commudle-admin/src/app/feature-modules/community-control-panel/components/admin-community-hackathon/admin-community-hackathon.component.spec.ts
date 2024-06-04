/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AdminCommunityHackathonComponent } from './admin-community-hackathon.component';

describe('AdminCommunityHackathonComponent', () => {
  let component: AdminCommunityHackathonComponent;
  let fixture: ComponentFixture<AdminCommunityHackathonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminCommunityHackathonComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCommunityHackathonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
