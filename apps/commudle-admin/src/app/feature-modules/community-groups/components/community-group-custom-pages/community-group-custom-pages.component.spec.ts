/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CommunityGroupCustomPagesComponent } from './community-group-custom-pages.component';

describe('CommunityGroupCustomPagesComponent', () => {
  let component: CommunityGroupCustomPagesComponent;
  let fixture: ComponentFixture<CommunityGroupCustomPagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CommunityGroupCustomPagesComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityGroupCustomPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
