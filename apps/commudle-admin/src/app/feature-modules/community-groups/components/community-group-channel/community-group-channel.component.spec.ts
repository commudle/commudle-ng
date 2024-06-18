/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CommunityGroupChannelComponent } from './community-group-channel.component';

describe('CommunityGroupChannelComponent', () => {
  let component: CommunityGroupChannelComponent;
  let fixture: ComponentFixture<CommunityGroupChannelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CommunityGroupChannelComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityGroupChannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
