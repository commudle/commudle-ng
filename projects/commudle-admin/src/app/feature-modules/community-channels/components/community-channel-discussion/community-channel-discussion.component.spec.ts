import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityChannelDiscussionComponent } from './community-channel-discussion.component';

describe('CommunityChannelDiscussionComponent', () => {
  let component: CommunityChannelDiscussionComponent;
  let fixture: ComponentFixture<CommunityChannelDiscussionComponent>;

  beforeEach(async(() => {
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
