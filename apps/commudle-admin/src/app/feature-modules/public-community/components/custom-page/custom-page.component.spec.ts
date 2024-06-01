/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CustomPageComponent } from './custom-page.component';

describe('CustomPageComponent', () => {
  let component: CustomPageComponent;
  let fixture: ComponentFixture<CustomPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CustomPageComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
