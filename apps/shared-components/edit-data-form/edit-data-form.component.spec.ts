/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EditDataFormComponent } from './edit-data-form.component';

describe('EditDataFormComponent', () => {
  let component: EditDataFormComponent;
  let fixture: ComponentFixture<EditDataFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditDataFormComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDataFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
