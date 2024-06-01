/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { InterestedMembersComponent } from './interested-members.component';

describe('InterestedMembersComponent', () => {
  let component: InterestedMembersComponent;
  let fixture: ComponentFixture<InterestedMembersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InterestedMembersComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterestedMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
