import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UserFeedPostComponent} from 'projects/commudle-admin/src/app/feature-modules/users/components/public-profile/user-extra-details/user-content/user-feed/user-feed-posts/user-feed-post/user-feed-post.component';

describe('UserFeedPostComponent', () => {
  let component: UserFeedPostComponent;
  let fixture: ComponentFixture<UserFeedPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserFeedPostComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFeedPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
