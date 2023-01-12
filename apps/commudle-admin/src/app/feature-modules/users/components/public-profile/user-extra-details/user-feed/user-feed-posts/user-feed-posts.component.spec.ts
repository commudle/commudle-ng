import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserFeedPostsComponent } from './user-feed-posts.component';

describe('UserFeedPostsComponent', () => {
  let component: UserFeedPostsComponent;
  let fixture: ComponentFixture<UserFeedPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserFeedPostsComponent],
    }).compileComponents();
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
