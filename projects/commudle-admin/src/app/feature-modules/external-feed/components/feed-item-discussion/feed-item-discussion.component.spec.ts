import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FeedItemDiscussionComponent} from './feed-item-discussion.component';

describe('FeedItemDiscussionComponent', () => {
  let component: FeedItemDiscussionComponent;
  let fixture: ComponentFixture<FeedItemDiscussionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FeedItemDiscussionComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedItemDiscussionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
