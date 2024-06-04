/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CommunityChannelsAndForumsComponent } from './community-channels-and-forums.component';

describe('CommunityChannelsAndForumsComponent', () => {
  let component: CommunityChannelsAndForumsComponent;
  let fixture: ComponentFixture<CommunityChannelsAndForumsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CommunityChannelsAndForumsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityChannelsAndForumsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
