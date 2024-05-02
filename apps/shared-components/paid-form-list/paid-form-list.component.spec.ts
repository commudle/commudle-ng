/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PaidFormListComponent } from './paid-form-list.component';

describe('PaidFormListComponent', () => {
  let component: PaidFormListComponent;
  let fixture: ComponentFixture<PaidFormListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PaidFormListComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaidFormListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
