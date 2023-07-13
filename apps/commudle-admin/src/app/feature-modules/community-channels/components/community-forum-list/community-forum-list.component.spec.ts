import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CommunityForumListComponent } from './community-forum-list.component';

describe('CommunityChannelListComponent', () => {
  let component: CommunityForumListComponent;
  let fixture: ComponentFixture<CommunityForumListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CommunityForumListComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityForumListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
