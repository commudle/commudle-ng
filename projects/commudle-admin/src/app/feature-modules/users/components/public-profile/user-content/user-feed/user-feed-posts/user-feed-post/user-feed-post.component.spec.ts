import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UserFeedPostComponent} from './user-feed-post.component';

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
