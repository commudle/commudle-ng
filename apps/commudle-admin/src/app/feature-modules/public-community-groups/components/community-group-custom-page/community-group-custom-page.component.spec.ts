/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CommunityGroupCustomPageComponent } from './community-group-custom-page.component';

describe('CommunityGroupCustomPageComponent', () => {
  let component: CommunityGroupCustomPageComponent;
  let fixture: ComponentFixture<CommunityGroupCustomPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CommunityGroupCustomPageComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityGroupCustomPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
