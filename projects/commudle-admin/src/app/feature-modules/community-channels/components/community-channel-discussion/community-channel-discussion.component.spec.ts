import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CommunityChannelDiscussionComponent } from './community-channel-discussion.component';

describe('CommunityChannelDiscussionComponent', () => {
  let component: CommunityChannelDiscussionComponent;
  let fixture: ComponentFixture<CommunityChannelDiscussionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CommunityChannelDiscussionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityChannelDiscussionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
