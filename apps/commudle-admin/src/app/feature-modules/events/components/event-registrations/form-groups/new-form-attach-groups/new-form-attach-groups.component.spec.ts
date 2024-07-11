/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NewFormAttachGroupsComponent } from './new-form-attach-groups.component';

describe('NewFormAttachGroupsComponent', () => {
  let component: NewFormAttachGroupsComponent;
  let fixture: ComponentFixture<NewFormAttachGroupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewFormAttachGroupsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewFormAttachGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
