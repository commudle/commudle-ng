/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UserDetailsCheckboxFormComponent } from './user-details-checkbox-form.component';

describe('UserDetailsCheckboxFormComponent', () => {
  let component: UserDetailsCheckboxFormComponent;
  let fixture: ComponentFixture<UserDetailsCheckboxFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserDetailsCheckboxFormComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailsCheckboxFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
