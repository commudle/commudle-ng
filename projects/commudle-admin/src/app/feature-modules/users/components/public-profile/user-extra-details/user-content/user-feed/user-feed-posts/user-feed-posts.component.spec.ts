import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UserFeedPostsComponent} from 'projects/commudle-admin/src/app/feature-modules/users/components/public-profile/user-extra-details/user-content/user-feed/user-feed-posts/user-feed-posts.component';

describe('UserFeedPostsComponent', () => {
  let component: UserFeedPostsComponent;
  let fixture: ComponentFixture<UserFeedPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserFeedPostsComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFeedPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
