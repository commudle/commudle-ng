/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CommunityPageShowComponent } from './community-page-show.component';

describe('CommunityPageShowComponent', () => {
  let component: CommunityPageShowComponent;
  let fixture: ComponentFixture<CommunityPageShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CommunityPageShowComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityPageShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
