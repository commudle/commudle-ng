/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ExaDrivePageComponent } from './exa-drive-page.component';

describe('ExaDrivePageComponent', () => {
  let component: ExaDrivePageComponent;
  let fixture: ComponentFixture<ExaDrivePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExaDrivePageComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExaDrivePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
